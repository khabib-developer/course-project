import { DataTypes, Model, Sequelize } from "@sequelize/core";
import { Comment } from "./Comment";
import { Like } from "./Like";
import { Tag } from "./Tag";

export class Item extends Model {
  declare addTag: (tag: Tag) => void;
  declare removeTag: (tag: Tag) => void;
  declare removeLike: (like: Like) => void;
  declare removeComment: (comment: Comment) => void;
  declare id: number;
  declare name: string;
  declare image: string;
  declare CollectionId: number;
  declare like: number;
  declare Tags: Tag[];
  declare additionalFields: string;
}

export function initItem(sequelize: Sequelize): void {
  Item.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "item",
      sequelize,
    }
  );
}
