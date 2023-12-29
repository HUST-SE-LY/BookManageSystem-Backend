import { Context } from "koa";
import { Supplier } from "../../database/tables/supplier";
import jwt from 'jsonwebtoken'
interface RegisterParams {
  account: string;
  name: string;
  password: string;
  phone: string;
  address: string;
}

export const register = async (ctx: Context) => {
  const {account, password, name, phone, address} = ctx.request.body as RegisterParams;
  const hasCreated = await Supplier.findOne({where: {account}});
  if(hasCreated) {
    ctx.status = 400;
    ctx.body = {
      msg: 'Account already exists'
    }
  } else {
    const supplier = await Supplier.create({
      account,
      password,
      name,
      phone,
      address,
    })
    const token = jwt.sign({
      id: supplier.dataValues.id,
      type: 'supplier'
    }, process.env.SUPPLIER_SECRET as string, {expiresIn: '24h'});
    ctx.status = 200;
    ctx.body = {
      msg: "success",
      token,
    }
  }
}