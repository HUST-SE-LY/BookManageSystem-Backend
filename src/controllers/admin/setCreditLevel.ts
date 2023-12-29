import { Context } from "koa";
import { User } from "../../database/tables/user";

interface setCreditLevelParams {
  id: number;
  level: number;
}

export const setCreditLevel = async (ctx:Context) => {
  const {id, level} = ctx.request.body as setCreditLevelParams;
  await User.update({credit_level: level},{where: {id}});
  ctx.status = 200;
  ctx.body = {
    msg: "success",
  }
}