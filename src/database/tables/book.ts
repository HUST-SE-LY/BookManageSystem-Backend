import { DataTypes, ModelDefined, Optional } from "sequelize";
import { sequelize } from "..";

interface BookAttributes {
  id: number;
  title: string;
  publisher: string;
  price: number;
  quantity: number;
  cover_image: string;
  contents: string;
  stock_location: string;
}

type BookCreationAttributes = Optional<BookAttributes, 'id' | 'cover_image' | 'contents' | 'stock_location'>

//书店供书表
export const Book: ModelDefined<BookAttributes, BookCreationAttributes> = sequelize.define('Book', {
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
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  contents: {
    type: DataTypes.STRING(2000),
    allowNull: true,
  },
  stock_location: {
    type: DataTypes.STRING(100),
    allowNull: true,
  }
})