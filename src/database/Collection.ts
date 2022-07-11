import { DataTypes, Model, Sequelize } from "@sequelize/core";
import { Item } from "./Item";

export class Collection extends Model {
  declare id: number;
  declare name: string;
  declare description: string;
  declare theme: string;
  declare image: string;
  declare UserId: number;
  declare Items: Item[];
}

export function initCollection(sequelize: Sequelize): void {
  Collection.init(
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
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      theme: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "collection",
      sequelize,
    }
  );
}
