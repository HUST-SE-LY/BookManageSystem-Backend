import { Context } from "koa";
import { TokenType } from "../../type";
import { Order } from "../../database/tables/orders";
import { sequelize } from "../../database";
import { User } from "../../database/tables/user";

interface confirmOrderParams {
  id: number;
}

export const confirmOrder = async (ctx: Context) => {
  const userId = (ctx.auth as TokenType).id;
  const { id } = ctx.request.body as confirmOrderParams;
  const order = await Order.findByPk(id);
  if (order?.dataValues.user_id !== userId) {
    ctx.status = 400;
    ctx.msg = "invalid user";
    return;
  }
  const transaction = await sequelize.transaction();
  try {
    const user = await User.findByPk(userId);
    const {total_price} = order.dataValues
    if(!user) throw new Error("user not found");
    if(user.dataValues.credit_level >= 3) {
      await user.decrement({remain: total_price},{transaction});
    }
    await Order.update({has_get: true}, {where: {id}, transaction});
    await transaction.commit();
    ctx.status = 200;
    ctx.body = {
      msg: "success"
    }
  } catch (err) {
    await transaction.rollback();
    ctx.status = 500;
    ctx.body = {
      msg: (err as Error).message,
    };
  }
};
