import sequelize from "sequelize";
import { Op } from "sequelize";
import { additionalFieldAttributes } from "../constants";
import { AdditionalFields } from "../database/AdditionalFields";
import { AdditionalFieldsValue } from "../database/AdditionalFieldsValue";
import { Collection } from "../database/Collection";
import { Comment } from "../database/Comment";
import { Item } from "../database/Item";
import { Like } from "../database/Like";
import { Tag } from "../database/Tag";
import { User } from "../database/User";
import ApiError from "../exception/api-errors";
import fileService from "./file-service";
import tagService from "./tag-service";

class CollectionService {
  async create(collection: Collection, AdditionalField: AdditionalFields) {
    return await Collection.create(
      {
        ...collection,
        AdditionalField,
      },
      {
        include: [AdditionalFields],
      }
    );
  }

  async getById(id: number) {
    const collection: any = await Collection.findOne({
      where: { id },
      include: [
        User,
        {
          model: Item,
          include: [
            Tag,
            Like,
            Comment,
            {
              model: AdditionalFieldsValue,
              attributes: additionalFieldAttributes,
            },
          ],
        },
        { model: AdditionalFields, attributes: additionalFieldAttributes },
      ],
    });
    if (collection) {
      collection.dataValues.tags = (
        await tagService.getByTheme(collection?.theme)
      ).map((tag: any) => tag.dataValues);
      return collection;
    }
    throw ApiError.BadRequest("Collection not found");
  }

  async update(body: any) {
    const collection = await Collection.findOne({
      where: { id: body.id },
      include: [
        User,
        AdditionalFields,
        {
          model: Item,
          include: [
            Tag,
            Like,
            Comment,
            {
              model: AdditionalFieldsValue,
              attributes: additionalFieldAttributes,
            },
          ],
        },
      ],
    });
    body.image &&
      collection?.image &&
      body.image !== collection?.image &&
      fileService.delete(collection?.image || "");
    collection?.set({ ...body });
    await this.updateAdditionalFields(body.AdditionalField);
    await collection?.save();
    return collection;
  }

  async updateAdditionalFields(body: any) {
    const additionalField = await AdditionalFields.findOne({
      where: { CollectionId: body.CollectionId },
    });
    additionalField?.set({
      ...additionalFieldAttributes.reduce(
        (acc, field) => ({ ...acc, [field]: null }),
        {}
      ),
      ...body,
    });
    await additionalField?.save();
    return additionalField;
  }

  async getBigCollections() {
    return (await Collection.findAll({ include: [Item] }))
      .sort((a: any, b: any) => b.Items.length - a.Items.length)
      .filter((_, i: number) => i < 6);
  }

  async delete(id: number) {
    const collection: any = await Collection.findOne({
      where: { id },
      include: [Item],
    });
    if (collection) {
      collection.image && fileService.delete(collection?.image || "");
      (collection.Items as Item[]).forEach((item) =>
        fileService.delete(item.image)
      );

      await collection.destroy();
    }
    return collection;
  }

  async search(text: string) {
    const searchText: any = {
      [Op.like]: `%${text}%`,
    };
    const where: any = {
      [Op.or]: [
        {
          name: searchText,
        },
        {
          "$Collection.name$": searchText,
        },
        {
          "$Collection.description$": searchText,
        },
        {
          "$Tags.name$": searchText,
        },
        {
          "$Comments.text$": searchText,
        },
        {
          "$AdditionalFieldsValue.string_1$": searchText,
        },
        {
          "$AdditionalFieldsValue.string_2$": searchText,
        },
        {
          "$AdditionalFieldsValue.string_3$": searchText,
        },
        {
          "$AdditionalFieldsValue.text_1$": searchText,
        },
        {
          "$AdditionalFieldsValue.text_2$": searchText,
        },
        {
          "$AdditionalFieldsValue.text_3$": searchText,
        },
      ],
    };

    return await Item.findAll({
      where,
      include: [
        { model: Collection, include: [User] },
        Like,
        Tag,
        Comment,
        AdditionalFieldsValue,
      ],
    });
  }
}

export default new CollectionService();
