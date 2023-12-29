import { Context } from "koa";
import { Supplier } from "../../database/tables/supplier";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
interface LoginParams {
  account: string;
  password: string;
}

export const login = async (ctx:Context) => {
  const {account, password} = ctx.request.body as LoginParams;
  const supplier = await Supplier.findOne({where: {account}});
  if(supplier) {
    if(bcrypt.compareSync(password, supplier.dataValues.password)) {
      const token = jwt.sign({
        id: supplier.dataValues.id,
        type: 'supplier',
      }, process.env.SUPPLIER_SECRET as string, {expiresIn: '24h'});
      ctx.status = 200;
      ctx.body = {
        msg: "success",
        token,
      }
    } else {
      ctx.status = 400;
      ctx.body = {
        msg: 'incorrect password'
      }
    }
  } else {
    ctx.status = 400;
    ctx.body = {
      message: 'incorrect account'
    }
  }
}