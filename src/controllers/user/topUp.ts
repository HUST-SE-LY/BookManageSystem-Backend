import { Context } from "koa";
import { TokenType } from "../../type"
import { User } from "../../database/tables/user";

export const topUp = async (ctx:Context) => {
  const authInfo = ctx.auth as TokenType;
  const number = ctx.request.body.number as number;
  await User.increment({remain: number},{where: {
    id: authInfo.id,
  }})
  ctx.status = 200;
  ctx.body = {
    msg: "success"
  }

}