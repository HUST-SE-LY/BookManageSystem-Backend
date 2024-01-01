import { Context } from "koa";
import { Order } from "../../database/tables/orders";

export const getOrders = async (ctx: Context) => {
  const orders = await Order.findAll();
  ctx.status = 200;
  ctx.body = {
    orders
  }
}