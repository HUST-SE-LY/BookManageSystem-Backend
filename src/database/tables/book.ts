import { DataTypes, Model, ModelDefined, Optional } from "sequelize";
import { sequelize } from "..";
import { AuthorAttributes } from "./author";
import { KeywordAttributes } from "./keyword";

interface BookAttributes {
  id: number;
  title: string;
  publisher: string;
  price: number;
  amount: number;
  cover_image: string;
  purchase_price: number;
  contents: string;
  stock_location: string;
  on_sale: boolean;
  Authors: AuthorAttributes[];
  Keywords: KeywordAttributes[];
}

type BookCreationAttributes = Optional<BookAttributes, 'id' | 'cover_image' | 'contents' | 'stock_location' | 'Authors' | 'Keywords' | 'on_sale' | 'price'>

export interface BookModel extends Model<BookAttributes, BookCreationAttributes> {
  setAuthors: Function;
  setKeywords: Function;
}

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
    allowNull: true,
  },
  purchase_price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  amount: {
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
  },
  on_sale: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },

})