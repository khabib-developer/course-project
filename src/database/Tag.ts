import { DataTypes, Model, Sequelize } from "@sequelize/core";

export class Tag extends Model {
  declare id: number;
  declare name: string;
  declare theme: string;
}

export function initTag(sequelize: Sequelize): void {
  Tag.init(
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
      theme: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "tag",
      sequelize,
    }
  );
}
