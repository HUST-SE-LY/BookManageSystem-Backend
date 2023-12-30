import { Context } from "koa";
import { sequelize } from "../../database";
import { PurchaseRecord } from "../../database/tables/purchaseRecord";
import { MissingRecord } from "../../database/tables/missingRecord";
import { Author } from "../../database/tables/author";
import { Keyword } from "../../database/tables/keyword";

interface FinishPurchaseParams {
  id: number;
}

export const finishPurchase = async (ctx: Context) => {
  const {id} = ctx.request.body as FinishPurchaseParams;
  const transaction = await sequelize.transaction();
  try {
    const purchaseRecord = await PurchaseRecord.findByPk(id,{
      include: [      {
        model: Author,
        as: 'Authors', 
        through: { attributes: [] }
      },
      {
        model: Keyword,
        as: 'Keywords',
        through: { attributes: [] }
      },]
    })
    if(!purchaseRecord) throw new Error(`purchaseRecord not found`);
    const {title, price, amount, Authors, Keywords} = purchaseRecord?.dataValues;
    const AuthorIds = Authors.map((el) => el.id);
    const KeywordIds = Authors.map(el => el.id);
    
    await MissingRecord.destroy({where: {id: purchaseRecord?.dataValues.record_id}, transaction});
    await PurchaseRecord.update({ok: true}, {where: {id}, transaction})
    await transaction.commit();
    ctx.status = 200;
    ctx.body = {
      msg: 'success',
    }
  } catch (err) {
    await transaction.rollback();
    ctx.status = 500;
    ctx.body = {
      msg: (err as Error).message,
    };
  }
};
