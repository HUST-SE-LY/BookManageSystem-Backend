import { DataTypes, ModelDefined } from "sequelize";
import { sequelize } from "..";
import { Book } from "./book";
import { Keyword } from "./keyword";

interface BookKeywordAttributes {
  book_id: number;
  keyword_id: number;
}

//书店书籍和关键词关联表
export const BookKeyword:ModelDefined<BookKeywordAttributes,{}> = sequelize.define('BookKeyword', {
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