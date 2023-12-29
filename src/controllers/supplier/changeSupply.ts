import { Context } from "koa";
import { Supply, SupplyModel } from "../../database/tables/supply";
import { Author } from "../../database/tables/author";
import { SupplyAuthor } from "../../database/tables/supplyAuthor";
import { sequelize } from "../../database";
import { Keyword } from "../../database/tables/keyword";

interface ChangeSupplyParams {
  id: number;
  title: string;
  publisher: string;
  price: number;
  amount: number;
  authors: string[];
  keywords: string[];
}

export const changeSupply = async (ctx: Context) => {
  const { id, title, publisher, price, amount, authors, keywords } = ctx.request
    .body as ChangeSupplyParams;
  const transaction = await sequelize.transaction();
  try {
    const supply = await Supply.findByPk(id, { transaction });
    if (!supply) throw new Error("Supply not found");
    await Supply.update(
      {
        title,
        publisher,
        price,
        amount,
      },
      {
        where: { id },
        transaction,
      }
    );
    const authorIds = [];
    const keywordIds = [];
    for (const authorName of authors) {
      let author = await Author.findOne({
        where: { name: authorName },
        transaction,
      });
      if (!author) {
        author = await Author.create({ name: authorName }, { transaction });
      }
      authorIds.push(author.dataValues.id);
    }
    await (supply as unknown as SupplyModel).setAuthors([], { transaction });
    await (supply as unknown as SupplyModel).setAuthors(authorIds, {
      transaction,
    });
    for (const content of keywords) {
      let keyword = await Keyword.findOne({ where: { content }, transaction });
      if (!keyword) {
        keyword = await Keyword.create({ content }, { transaction });
      }
      keywordIds.push(keyword.dataValues.id);
    }
    await (supply as unknown as SupplyModel).setKeywords([], { transaction });
    await (supply as unknown as SupplyModel).setKeywords(keywordIds, {
      transaction,
    });
    await transaction.commit();
    const res = await Supply.findByPk(id, {
      attributes: ['id','title','amount','price','publisher'],
      include: [
        {
          model: Author,
          as: 'Authors', 
          through: { attributes: [] }
        },
        {
          model: Keyword,
          as: 'Keywords',
          through: { attributes: [] }
        }
      ]
    })
    ctx.status = 200;
    ctx.body = {
      msg: "success",
      supply: res?.dataValues
    };
  } catch (err) {
    await transaction.rollback();
    ctx.status = 500;
    ctx.body = {
      msg: (err as Error).message,
    };
  }
};
