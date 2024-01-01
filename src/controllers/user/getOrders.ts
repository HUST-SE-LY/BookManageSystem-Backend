import { Context } from "koa";
import { Order } from "../../database/tables/orders";
import { TokenType } from "../../type";

export const getOrders = async (ctx: Context) => {
  const userId = (ctx.auth as TokenType).id;
  const orders = await Order.findAll({where: {user_id: userId}});
  
  ctx.status = 200;
  ctx.body = {
    orders
  }
}