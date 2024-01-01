import { Context } from "koa";
import { Book } from "../../database/tables/book";
import { Author } from "../../database/tables/author";
import { Keyword } from "../../database/tables/keyword";

export const getBooks = async (ctx:Context) => {
  const books = await Book.findAll({
    attributes: ['id', 'title', 'publisher', 'price', 'amount', ["cover_image", 'coverImage'], 'contents'],
    where: {
      on_sale: true,
    },
    include:[
      {
        model: Author,
        as: 'Authors', 
        through: { attributes: [] }
      },
      {
        model: Keyword,
        as: 'Keywords',
        through: { attributes: [] }
      },
    ]
  })
  ctx.status = 200;
  ctx.body = {
    books,
  }
}