import { DataTypes, Model, ModelDefined, Optional } from "sequelize";
import { sequelize } from "..";
import { AuthorAttributes } from "./author";
import { KeywordAttributes } from "./keyword";

interface BookAttributes {
  id: number;//书号
  title: string;//书名
  publisher: string;//出版商
  price: number;//单价
  amount: number;//数量
  cover_image: string;//封面
  purchase_price: number;//批发价
  contents: string;//目录
  stock_location: string;//存储位置
  on_sale: boolean;//是否上架
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