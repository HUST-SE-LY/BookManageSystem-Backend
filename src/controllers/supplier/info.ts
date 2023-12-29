import { Context } from "koa";
import { TokenType } from "../../type";
import { Supplier } from "../../database/tables/supplier";

export const getInfo = async (ctx: Context) => {
  const authInfo = ctx.auth as TokenType;
  const info = await Supplier.findOne({ where: { id: authInfo.id } });
  if (info) {
    const { account, id, name, phone, address } = info.dataValues;
    ctx.status = 200;
    ctx.body = {
      info: {
        account,
        id,
        name,
        phone,
        address,
      },
    };
  } else {
    ctx.status = 400;
    ctx.body = {
      msg: "not found",
    };
  }
};
