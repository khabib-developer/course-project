import { DataTypes, Model, Sequelize } from "@sequelize/core";

export class AdditionalFields extends Model {
  declare id: number;
  declare number_1: string;
  declare number_2: string;
  declare number_3: string;
  declare string_1: string;
  declare string_2: string;
  declare string_3: string;
  declare text_1: string;
  declare text_2: string;
  declare text_3: string;
  declare boolean_1: string;
  declare boolean_2: string;
  declare boolean_3: string;
  declare date_1: string;
  declare date_2: string;
  declare date_3: string;
}

export function initAdditioanlFields(sequelize: Sequelize): void {
  AdditionalFields.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      number_1: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      number_2: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      number_3: {
        type: DataTypes.STRING,
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
        type: DataTypes.STRING,
        allowNull: true,
      },
      text_2: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      text_3: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      boolean_1: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      boolean_2: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      boolean_3: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      date_1: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      date_2: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      date_3: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "additionalFields",
      sequelize,
    }
  );
}
