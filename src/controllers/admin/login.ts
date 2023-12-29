import { Context } from "koa";
import jwt from 'jsonwebtoken'
interface loginParams {
  account: string;
  password: string;
}

export const login = async (ctx: Context) => {
  const { account, password } = ctx.request.body as loginParams;
  if (
    account === (process.env.ADMIN_ACCOUNT as string) &&
    password === (process.env.ADMIN_PASSWORD as string)
  ) {
    const token = jwt.sign({
      type: 'admin',
      id: account,
    }, process.env.ADMIN_SECRET as string, {expiresIn: '24h'});
    ctx.status = 200;
    ctx.body = {
      msg: "success",
      token,
    }
  } else {
    ctx.status = 400;
    ctx.body = {
      msg: "incorrect password",
    };
  }
};
