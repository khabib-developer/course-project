import { DataTypes, Model, Sequelize } from "@sequelize/core";

export class Like extends Model {
  declare id: number;
  declare UserId: number;
  declare ItemId: number;
}

export function initLike(sequelize: Sequelize): void {
  Like.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    },
    {
      tableName: "like",
      sequelize,
    }
  );
}
