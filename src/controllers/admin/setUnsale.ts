import { Context } from "koa";

import { Book } from "../../database/tables/book";
import { sequelize } from "../../database";

interface unSaleBookParams {
  id: number;
}

export const UnSaleBook = async (ctx: Context) => {
  const { id } = ctx.request.body as unSaleBookParams;
  const transaction = await sequelize.transaction();
  try {
    await Book.update({ on_sale: false }, { where: { id } });
    await transaction.commit();
    ctx.status = 200;
    ctx.body = {
      msg: "success",
    };
  } catch (err) {
    await transaction.rollback();
    ctx.status = 500;
    ctx.body = {
      msg: (err as Error).message,
    };
  }
};