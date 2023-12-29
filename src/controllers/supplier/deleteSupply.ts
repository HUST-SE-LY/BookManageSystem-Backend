import { Context } from "koa";
import { Supply, SupplyModel } from "../../database/tables/supply";
import { sequelize } from "../../database";

export const deleteSupply = async (ctx: Context) => {
  const id = parseInt(ctx.request.query.id as string);
  const transaction = await sequelize.transaction();
  try {
    const supply = await Supply.findByPk(id, { transaction });
    if (!supply) throw new Error("Supply not found");
    await (supply as unknown as SupplyModel).setAuthors([], { transaction });
    await (supply as unknown as SupplyModel).setKeywords([], { transaction });
    await Supply.destroy({
      where: { id },
      transaction,
    });
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
