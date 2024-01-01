import { Context } from "koa";
import { sequelize } from "../../database";
import { Order } from "../../database/tables/orders";

interface StartDeliverParams {
  id: number;
}

export const startDeliver = async (ctx: Context) => {
  const { id } = ctx.request.body as StartDeliverParams;
  const transaction = await sequelize.transaction();
  try {
    await Order.update({ has_deliver: true }, { where: { id }, transaction });
    await transaction.commit();
    ctx.status = 200;
    ctx.body = {
      msg: "Success",
    };
  } catch (err) {
    await transaction.rollback();
    ctx.status = 500;
    ctx.body = {
      msg: (err as Error).message,
    };
  }
};
