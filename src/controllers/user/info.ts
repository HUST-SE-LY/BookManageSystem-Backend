import { Context } from "koa";
import { TokenType } from "../../type";
import { User } from "../../database/tables/user";

export const getInfo = async (ctx:Context) => {
  const authInfo = ctx.auth as TokenType;
  const info = await User.findOne({where: {id: authInfo.id}});
  if(info) {
    ctx.status = 200;
    ctx.body = {
      info: {
        account: info.dataValues.account,
        id: info.dataValues.id,
        name: info.dataValues.name,
        phone: info.dataValues.phone,
        address: info.dataValues.address,
        creditLevel: info.dataValues.credit_level,
        remain: info.dataValues.remain
      }
    }
  } else {
    ctx.status = 400;
    ctx.body = {
      msg: 'not found',
    }
  }
}