import { Context } from "koa";
import { TokenType } from "../../type";
import { Supplier } from "../../database/tables/supplier";

interface changeInfoParams {
  name: string;
  account: string;
  address: string;
}

export const changeInfo = async (ctx: Context) => {
  const { name, account, address } = ctx.request.body as changeInfoParams;
  const id = (ctx.auth as TokenType).id;
  await Supplier.update({ name, account, address }, { where: { id } });
  ctx.status = 200;
  ctx.body = { msg: "success" };
};