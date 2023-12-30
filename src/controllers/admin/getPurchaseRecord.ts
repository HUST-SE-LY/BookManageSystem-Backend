import { Context } from "koa";
import { PurchaseRecord } from "../../database/tables/purchaseRecord";
import { Author } from "../../database/tables/author";
import { Keyword } from "../../database/tables/keyword";

export const getPurchaseRecord = async (ctx: Context) => {
  const records = await PurchaseRecord.findAll({
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
    ]
  })
  ctx.status = 200;
  ctx.body = {
    records
  }
}