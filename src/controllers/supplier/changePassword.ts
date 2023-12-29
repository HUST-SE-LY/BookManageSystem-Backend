import { Context } from "koa";
import { TokenType } from "../../type";
import { Supplier } from "../../database/tables/supplier";

interface changePasswordParams {
  password: string;
}

export const changePassword = async (ctx: Context) => {
  const { password } = ctx.request.body as changePasswordParams;
  const id = (ctx.auth as TokenType).id;
  await Supplier.update({ password }, { where: { id } });
  ctx.body = {
    msg: "Success",
  };
  ctx.status = 200;
};