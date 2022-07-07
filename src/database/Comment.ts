import { DataTypes, Model, Sequelize } from "@sequelize/core";

export class Comment extends Model {
  declare id: number;
  declare UserId: number;
  declare ItemId: number;
  declare text: string;
}

export function initComment(sequelize: Sequelize): void {
  Comment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "comment",
      sequelize,
    }
  );
}
