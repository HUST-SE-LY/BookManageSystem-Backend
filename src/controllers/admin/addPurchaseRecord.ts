import { Context } from "koa";
import { sequelize } from "../../database";
import { PurchaseRecord, PurchaseRecordModel } from "../../database/tables/purchaseRecord";
import { MissingRecord } from "../../database/tables/missingRecord";
import { Supply } from "../../database/tables/supply";
import { Author } from "../../database/tables/author";
import { Keyword } from "../../database/tables/keyword";
import { Supplier } from "../../database/tables/supplier";

interface addPurchaseRecordParams {
  missingRecordId: number;
  amount: number;
}

export const addPurchaseRecord = async (ctx: Context) => {
  const { missingRecordId, amount } = ctx.request
    .body as addPurchaseRecordParams;
  const transaction = await sequelize.transaction();
  try {
    await MissingRecord.update(
      { purchase: true },
      { where: { id: missingRecordId }, transaction }
    );
    const missingRecord = await MissingRecord.findByPk(missingRecordId, {
      transaction,
      include: [
        {
          model: Supply,
          include: [
            {
              model: Author,
              as: "Authors",
              through: { attributes: [] },
            },
            {
              model: Keyword,
              as: "Keywords",
              through: { attributes: [] },
            },
            {
              model: Supplier,
              attributes: ["id", "name", "address", "phone"],
            },
          ],
        },
      ],
    });
    if (!missingRecord) throw new Error("no matched record");
    await Supply.decrement(
      { amount },
      { where: { id: missingRecord.dataValues.supply_id }, transaction }
    );
    const {title, price, publisher, Authors, Keywords} = missingRecord.dataValues.Supply;
    const authorIds = Authors.map((el) => el.id);
    const keywordIds = Keywords.map((el) => el.id);
    const newRecord = await PurchaseRecord.create({
      title,
      price,
      publisher,
      amount,
      record_id: missingRecordId,
    },{transaction});
    await (newRecord as unknown as PurchaseRecordModel).setAuthors(authorIds, {transaction});
    await (newRecord as unknown as PurchaseRecordModel).setKeywords(keywordIds, {transaction});
    await transaction.commit();

    ctx.status = 200;
    ctx.body = {
      msg: "ok",
    };
  } catch (err) {
    await transaction.rollback();
    ctx.status = 500;
    ctx.body = {
      msg: (err as Error).message,
    };
  }
};
