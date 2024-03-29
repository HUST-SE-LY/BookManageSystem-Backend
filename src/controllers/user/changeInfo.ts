import { Context } from "koa";
import { User } from "../../database/tables/user";
import { TokenType } from "../../type";

interface changeInfoParams {
  name: string;
  account: string;
  address: string;
}

export const changeInfo = async (ctx: Context) => {
  const { name, account, address } = ctx.request.body as changeInfoParams;
  const id = (ctx.auth as TokenType).id;
  await User.update({ name, account, address }, { where: { id } });
  ctx.status = 200;
  ctx.body = { msg: "success" };
};
