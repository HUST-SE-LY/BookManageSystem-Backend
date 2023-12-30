import { DataTypes, ModelDefined, Optional } from "sequelize";
import { sequelize } from "..";

export interface KeywordAttributes {
  id: number;
  content: string;
}

type KeywordCreationAttributes = Optional<KeywordAttributes, 'id'>


//书店书籍关键字表
export const Keyword:ModelDefined<KeywordAttributes, KeywordCreationAttributes> = sequelize.define('Keyword',{
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true,
  },
  content: {
    type: DataTypes.STRING(10),
    allowNull: false,
  }
})