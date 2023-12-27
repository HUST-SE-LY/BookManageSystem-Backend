import { DataTypes } from "sequelize";
import { sequelize } from "..";
import { Book } from "./book";
import { Keyword } from "./keyword";

//书店书籍和关键词关联表
export const BookKeyword = sequelize.define('BookKeyword', {
  book_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Book,
      key: 'id',
    }
  },
  keyword_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Keyword,
      key: 'id',
    }
  }
})