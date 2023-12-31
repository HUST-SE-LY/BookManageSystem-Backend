import { Context } from "koa";
import { sequelize } from "../../database";
import { PurchaseRecord } from "../../database/tables/purchaseRecord";
import { MissingRecord } from "../../database/tables/missingRecord";
import { Author } from "../../database/tables/author";
import { Keyword } from "../../database/tables/keyword";
import { Book, BookModel } from "../../database/tables/book";

interface FinishPurchaseParams {
  id: number;
}

export const finishPurchase = async (ctx: Context) => {
  const { id } = ctx.request.body as FinishPurchaseParams;
  const transaction = await sequelize.transaction();
  try {
    const purchaseRecord = await PurchaseRecord.findByPk(id, {
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
      ],
    });
    if (!purchaseRecord) throw new Error(`purchaseRecord not found`);
    const { title, price, amount, publisher, Authors, Keywords, book_id } =
      purchaseRecord?.dataValues;

    const AuthorIds = Authors.map((el) => el.id);
    const KeywordIds = Keywords.map((el) => el.id);
    const book = await Book.create(
      { title, purchase_price: price, amount, publisher },
      { transaction }
    );
    await PurchaseRecord.update(
      { book_id: book.dataValues.id },
      { where: { id } }
    );
    await (book as unknown as BookModel).setAuthors(AuthorIds, {
      transaction,
    });
    await (book as unknown as BookModel).setKeywords(KeywordIds, {
      transaction,
    });

    await MissingRecord.destroy({
      where: { id: purchaseRecord?.dataValues.record_id },
      transaction,
    });
    await PurchaseRecord.update({ ok: true }, { where: { id }, transaction });
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
