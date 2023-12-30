import { Context } from "koa";
import { MissingRecord } from "../../database/tables/missingRecord";
import { Author } from "../../database/tables/author";
import { Keyword } from "../../database/tables/keyword";
import { Supply } from "../../database/tables/supply";
import { Supplier } from "../../database/tables/supplier";

export const getMissingRecords = async (ctx:Context) => {
  const records = await MissingRecord.findAll({
    include: [
      {
        model: Supply,
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
      }
    ]
  })
  ctx.status = 200;
  ctx.body = {
    records,
  }
}