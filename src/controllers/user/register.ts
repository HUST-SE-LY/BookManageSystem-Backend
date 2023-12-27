import { Context } from "koa";

interface RegisterParams {
  account: string;
  name: string;
  password: string;
  phone: string;
  address: string;
}

export const register = async (ctx: Context) => {
  const {account, password, name, phone, address} = ctx.request.body as RegisterParams;
  
}