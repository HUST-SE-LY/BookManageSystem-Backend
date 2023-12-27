import { DataTypes, ModelDefined } from "sequelize";
import { sequelize } from "..";
import { Book } from "./book";
import { Author } from "./author";

interface BookAuthorAttributes {
  book_id: number;
  author_id: number;
}

//书店书籍和作者关联表
export const BookAuthor: ModelDefined<BookAuthorAttributes, {}> =
  sequelize.define("BookAuthor", {
    book_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Book,
        key: "id",
      },
    },
    author_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Author,
        key: "id",
      },
    },
  });
