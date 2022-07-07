import { DataTypes, Model } from "@sequelize/core";
import { language, theme } from "../constants";

export class User extends Model {
  declare id: number;
  declare name: string;
  declare email: string;
  declare password: string;
  declare blocked: boolean;
  declare admin: boolean;
  declare langauage: language.en | language.ru;
  declare theme: theme.dark | theme.light;
}

export function initUser(sequelize: any): void {
  User.init(
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
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      blocked: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      admin: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      language: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      theme: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "user",
      sequelize,
    }
  );
}
