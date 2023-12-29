import { Context } from "koa";
import { User } from "../../database/tables/user";

export const getUsersInfo = async (ctx: Context) => {
  const limit = parseInt(ctx.request.query.limit as string);
  const offset = parseInt(ctx.request.query.offset as string);
  const users = await User.findAll({ limit, offset , attributes:['id', 'name', 'phone', ['credit_level', 'creditLevel']]});
  ctx.status = 200;
  ctx.body = {
    users,
  };
};

