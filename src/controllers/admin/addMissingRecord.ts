import { Context } from "koa";
import { sequelize } from "../../database";
import { MissingRecord } from "../../database/tables/missingRecord";
import { Supply } from "../../database/tables/supply";
import { Author } from "../../database/tables/author";
import { Keyword } from "../../database/tables/keyword";
import { Supplier } from "../../database/tables/supplier";

interface AddMissingRecordParams {
  supply_id: number;
  amount: number;
}

export const addMissingRecord = async (ctx: Context) => {
  const { supply_id, amount } = ctx.request.body as AddMissingRecordParams;
  const transaction = await sequelize.transaction();
  try {
    const record = await MissingRecord.create(
      { supply_id, amount },
      { transaction }
    );
    await transaction.commit();
    const newRecord = await MissingRecord.findByPk(record.dataValues.id, {
      include: [
        {
          model: Supply,
          include: [
            {
              model: Author,
              as: "Authors",
              through: { attributes: [] },
            },
            {
              model: Keyword,
              as: "Keywords",
              through: { attributes: [] },
            },
            {
              model: Supplier,
              attributes: ["id", "name", "address", "phone"],
            },
          ],
        },
      ],
    });
    ctx.status = 200;
    ctx.body = {
      record: newRecord,
    };
  } catch (err) {
    await transaction.rollback();
    ctx.status = 500;
    ctx.body = {
      msg: (err as Error).message,
    };
  }
};
