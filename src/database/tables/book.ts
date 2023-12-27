import { DataTypes } from "sequelize";
import { sequelize } from "..";
//书店供书表
export const Book = sequelize.define('Book', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true,
  },
  title: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  publisher: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cover_image: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  contents: {
    type: DataTypes.STRING(2000),
    allowNull: true,
  },
  stock_location: {
    type: DataTypes.STRING(50),
    allowNull: true,
  }
})