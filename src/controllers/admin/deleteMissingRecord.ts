import { Context } from "koa";
import { sequelize } from "../../database";
import { MissingRecord } from "../../database/tables/missingRecord";

export const deleteMissingRecord = async (ctx: Context) => {
  const id = parseInt(ctx.request.query.id as string);
  const transaction = await sequelize.transaction();
  try {
    await MissingRecord.destroy({where:{id}, transaction});
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
