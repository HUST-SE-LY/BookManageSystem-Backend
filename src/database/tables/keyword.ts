import { DataTypes } from "sequelize";
import { sequelize } from "..";

export const Keyword = sequelize.define('Keyword',{
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