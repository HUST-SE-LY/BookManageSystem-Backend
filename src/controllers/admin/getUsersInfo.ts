import { Context } from "koa";
import { User } from "../../database/tables/user";

export const getUsersInfo = async (ctx: Context) => {
  const users = await User.findAll({ attributes:['id', 'name', 'phone', ['credit_level', 'creditLevel']]});
  ctx.status = 200;
  ctx.body = {
    users,
  };
};

