import { Context } from "koa";
import { Book } from "../../database/tables/book";
import { Author } from "../../database/tables/author";
import { Keyword } from "../../database/tables/keyword";

export const getBook = async (ctx:Context) => {
  const books = await Book.findAll({
    attributes: ['id', 'title', 'publisher', 'price', 'amount', ["cover_image", 'coverImage'], ['purchase_price', 'purchasePrice'], 'contents', ['stock_location', 'stockLocation'],['on_sale', 'onSale']],
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