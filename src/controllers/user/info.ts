import { Context } from "koa";
import { TokenType } from "../../type";
import { User } from "../../database/tables/user";

export const getInfo = async (ctx: Context) => {
  const authInfo = ctx.auth as TokenType;
  const info = await User.findOne({ where: { id: authInfo.id } });
  if (info) {
    const { account, id, name, phone, address, remain, credit_level:creditLevel } = info.dataValues;
    ctx.status = 200;
    ctx.body = {
      info: {
        account,
        id,
        name,
        phone,
        address,
        remain,
        creditLevel,
      },
    };
  } else {
    ctx.status = 400;
    ctx.body = {
      msg: "not found",
    };
  }
};
