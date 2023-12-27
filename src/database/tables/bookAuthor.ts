import { DataTypes } from "sequelize";
import { sequelize } from "..";
import { Book } from "./book";
import { Author } from "./author";
//书店书籍和作者关联表
export const BookAuthor = sequelize.define('BookAuthor',{
  book_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Book,
      key: 'id',
    }
  },
  author_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Author,
      key: 'id',
    }
  }
})