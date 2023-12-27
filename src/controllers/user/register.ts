import { Context } from "koa";
import { User } from "../../database/tables/user";
import jwt from "jsonwebtoken";

interface RegisterParams {
  account: string;
  name: string;
  password: string;
  phone: string;
  address: string;
}

export const register = async (ctx: Context) => {
  const {account, password, name, phone, address} = ctx.request.body as RegisterParams;
  const hasCreated = await User.findOne({where: {account}});
  if(hasCreated) {
    ctx.status = 400;
    ctx.body = {
      msg: 'Account already exists'
    }
  } else {
    const user = await User.create({
      account,
      password,
      name,
      phone,
      address,
      credit_level: 1,
      remain: 0,
    })
    const token = jwt.sign({
      id: user.dataValues.id
    }, process.env.SECRET || 'secret', {expiresIn: '24h'});
    ctx.status = 200;
    ctx.body = {
      msg: "success",
      token,
    }
  }
}