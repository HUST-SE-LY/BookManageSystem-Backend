import { Context } from "koa";
import { TokenType } from "../../type";
import { Supply } from "../../database/tables/supply";
import { Author } from "../../database/tables/author";
import { Keyword } from "../../database/tables/keyword";

export const getSupplies = async (ctx:Context) => {
  const supplierId = (ctx.auth as TokenType).id;
  const res = await Supply.findAll({
    where: [{supplier_id: supplierId}],
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
      }
    ]
  })
  console.log(res);
  ctx.status = 200;
  ctx.body = {
    supplies: res
  }
}