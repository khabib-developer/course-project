import { DataTypes, Model, Sequelize } from "@sequelize/core";

export class Token extends Model {
  declare id: number;
  declare UserId: number;
  declare refreshToken: string;
}

export function initToken(sequelize: Sequelize): void {
  Token.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      refreshToken: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: "token",
      sequelize,
    }
  );
}
