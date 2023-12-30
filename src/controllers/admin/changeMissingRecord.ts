import { Context } from "koa";
import { sequelize } from "../../database";
import { MissingRecord } from "../../database/tables/missingRecord";

interface ChangeMissingRecordParams {
  id: number;
  amount: number;
}

export const changeMissingRecord = async (ctx: Context) => {
  const transaction = await sequelize.transaction();
  const { id, amount } = ctx.request.body as ChangeMissingRecordParams;
  try {
    await MissingRecord.update({ amount }, { where: { id },transaction });
    await transaction.commit();
    ctx.status = 200;
    ctx.body = {
      msg: 'success'
    }
  } catch (err) {
    await transaction.rollback();
    ctx.status = 500;
    ctx.body = {
      msg: (err as Error).message,
    };
  }
};
