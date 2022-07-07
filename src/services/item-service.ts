import { Item } from "../database/Item";
import { Like } from "../database/Like";
import { Comment } from "../database/Comment";
import { Tag } from "../database/Tag";
import fileService from "./file-service";
import tagService from "./tag-service";
import { Collection } from "../database/Collection";
import { User } from "../database/User";
import { AdditionalFieldsValue } from "../database/AdditionalFieldsValue";

class ItemService {
  async create(item: Item, newTags: string[], existTags: any[], theme: string) {
    const newItem = await Item.create(
      {
        ...item,
        like: 0,
        Tags: [...newTags.map((name) => ({ name, theme }))],
      },
      { include: [Tag, AdditionalFieldsValue] }
    );
    existTags.forEach((tag) => newItem.addTag(tag));
    return newItem;
  }

  async addTag(item: Item, tags: string[]) {
    const t = await tagService.getByTag(tags);
    tags.forEach(async (itemTag) => {
      if (!t.find((tag) => tag.name === itemTag)) {
        const newTag = await tagService.create({
          name: itemTag,
          theme: item.Tags[0].theme,
        });
        item.addTag(newTag);
      }
    });
    t.forEach((tag) => item.addTag(tag));
  }

  async removeTag(item: Item, tags: Tag[]) {
    tags.forEach((tag) => item.removeTag(tag));
  }

  async update(body: any) {
    const item = await Item.findOne({
      where: { id: body.id },
      include: [Tag, Like, Comment],
    });
    body.image &&
      body.image !== item?.image &&
      fileService.delete(item?.image || "");
    body.tags && this.updateTags(body.tags, item);
    await this.updateAdditionalFieldsValue(body.AdditionalFieldsValue);
    item?.set({ ...body });
    await item?.save();
    return item;
  }

  async updateAdditionalFieldsValue(body: any) {
    const additionalFieldsValue = await AdditionalFieldsValue.findOne({
      where: { ItemId: body.ItemId },
    });
    additionalFieldsValue?.set({ ...body });
    await additionalFieldsValue?.save();
    return additionalFieldsValue;
  }

  async updateTags(tags: string[], item: any) {
    const forcreating: string[] = [],
      fordeleting: string[] = [];
    Array.from(
      new Set(tags.concat(item.Tags.map((tag: Tag) => tag.name)))
    ).forEach((tag: string) => {
      !!tags.find((t) => t === tag) &&
        !item.Tags.find((t: Tag) => t.name === tag) &&
        forcreating.push(tag);
      !tags.find((t) => t === tag) &&
        !!item.Tags.find((t: Tag) => t.name === tag) &&
        fordeleting.push(tag);
    });
    this.addTag(item, forcreating);
    this.removeTag(item, await tagService.getByTag(fordeleting));
  }

  async check(id: number) {
    return await Item.findOne({ where: { id } });
  }

  async delete(id: number) {
    const item = await Item.findOne({ where: { id } });
    fileService.delete(item?.image || "");
    await item?.destroy();

    return item;
  }

  async getlastItems() {
    return await Item.findAll({
      include: [
        { model: Collection, include: [User] },
        Like,
        Tag,
        Comment,
        AdditionalFieldsValue,
      ],
      order: [["id", "DESC"]],
      limit: 10,
    });
  }
}
export default new ItemService();
