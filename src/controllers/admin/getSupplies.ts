import { Context } from "koa";
import { Supply } from "../../database/tables/supply";
import { Author } from "../../database/tables/author";
import { Keyword } from "../../database/tables/keyword";
import { Supplier } from "../../database/tables/supplier";

export const getSupplies = async (ctx:Context) => {
  const supplies = await Supply.findAll({
    attributes: ['id','title','amount','price','publisher'],
    include: [
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
      {
        model: Supplier,
        attributes: ['id','name','address', 'phone']
      }
    ]
  })
  ctx.status = 200;
  ctx.body = {
    msg: "success",
    supplies
  }
}