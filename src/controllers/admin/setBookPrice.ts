import { Context } from "koa";
import { sequelize } from "../../database";
import { Book } from "../../database/tables/book";

interface setPriceParams {
  id: number;
  price: number;
}

export const setBookPrice = async (ctx: Context) => {
  const { id, price } = ctx.request.body as setPriceParams;
  const transaction = await sequelize.transaction();
  try {
    await Book.update({price},{where: {id}});
    await transaction.commit();
    ctx.status = 200;
    ctx.body = {
      msg: "success",
    }
  } catch (err) {
    await transaction.rollback();
    ctx.status = 500;
    ctx.body = {
      msg: (err as Error).message,
    };
  }
};
