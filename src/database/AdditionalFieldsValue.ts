import { DataTypes, Model, Sequelize } from "@sequelize/core";

export class AdditionalFieldsValue extends Model {
  declare id: number;
  declare number_1: number;
  declare number_2: number;
  declare number_3: number;
  declare string_1: string;
  declare string_2: string;
  declare string_3: string;
  declare text_1: string;
  declare text_2: string;
  declare text_3: string;
  declare boolean_1: boolean;
  declare boolean_2: boolean;
  declare boolean_3: boolean;
  declare date_1: string;
  declare date_2: string;
  declare date_3: string;
}

export function initAdditionalFieldsValue(sequelize: Sequelize): void {
  AdditionalFieldsValue.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      number_1: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      number_2: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      number_3: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      string_1: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      string_2: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      string_3: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      text_1: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      text_2: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      text_3: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      boolean_1: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      boolean_2: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      boolean_3: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      date_1: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      date_2: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      date_3: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "additionalFieldsValue",
      sequelize,
    }
  );
}
