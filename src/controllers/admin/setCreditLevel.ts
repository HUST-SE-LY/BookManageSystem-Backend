import { Context } from "koa";
import { User } from "../../database/tables/user";
import { sequelize } from "../../database";

interface setCreditLevelParams {
  id: number;
  level: number;
}

export const setCreditLevel = async (ctx: Context) => {
  const { id, level } = ctx.request.body as setCreditLevelParams;
  const transaction = await sequelize.transaction();
  try {
    await User.update({ credit_level: level }, { where: { id } });
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
