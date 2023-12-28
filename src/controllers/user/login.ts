import { Context } from "koa";
import { User } from "../../database/tables/user";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
interface LoginParams {
  account: string;
  password: string;
}

export const login = async (ctx:Context) => {
  const {account, password} = ctx.request.body as LoginParams;
  const user = await User.findOne({where: {account}});
  if(user) {
    if(bcrypt.compareSync(password, user.dataValues.password)) {
      const token = jwt.sign({
        id: user.dataValues.id,
        type: 'user',
      }, process.env.SECRET || 'secret', {expiresIn: '24h'});
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