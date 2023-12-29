import { Context } from "koa";
import { TokenType } from "../../type";
import { User } from "../../database/tables/user";

interface changePasswordParams {
  password: string;
}

export const changePassword = async (ctx: Context) => {
  const { password } = ctx.request.body as changePasswordParams;
  const id = (ctx.auth as TokenType).id;
  await User.update({ password }, { where: { id } });
  ctx.body = {
    msg: "Success",
  };
  ctx.status = 200;
};
