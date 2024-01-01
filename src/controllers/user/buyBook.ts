import { Context } from "koa";
import { sequelize } from "../../database";
import { User } from "../../database/tables/user";
import { Book } from "../../database/tables/book";
import { Order } from "../../database/tables/orders";
import { TokenType } from "../../type";

interface buyBookParams {
  id: number;
  amount: number;
}

export const buyBook = async (ctx: Context) => {
  const userId = (ctx.auth as TokenType).id;
  const {id, amount} = ctx.request.body as buyBookParams;
  const transaction = await sequelize.transaction()
  try {
    const user = await User.findByPk(userId);
    const book = await Book.findByPk(id);
    if(!user || !book) throw new Error("not found");
    const {credit_level, remain, address}= user.dataValues;
    const {price} = book.dataValues;
    if(book.dataValues.amount < amount) {
      ctx.status = 400;
      ctx.body = {
        msg: 'amount over limit',
      }
    }
    let totalPrice:number = Infinity;
    let overDraft = false;
    let overDraftAmount = 100;
    switch(credit_level) {
      case 1:
        totalPrice = price * amount * 0.9;
        overDraft = false;
        break;
      case 2:
        totalPrice = price * amount * 0.85;
        overDraft = false;
        break;
      case 3:
        totalPrice = price * amount * 0.85;
        overDraft = true;
        break;
      case 4:
        totalPrice = price * amount * 0.8;
        overDraft = true;
        break;
      case 5:
        totalPrice = price * amount * 0.75;
        overDraft = true;
        overDraftAmount = Infinity;
        break;
    }
    if(!overDraft) {
      if(remain < totalPrice) {
        ctx.status = 400;
        ctx.body = {
          msg: 'remain is not enough!'
        }
        return;
      }
      await user.decrement({remain: totalPrice},{transaction});
    } else {
      if(remain + overDraftAmount < 0) {
        ctx.status = 400;
        ctx.body = {
          msg: 'remain is not enough!'
        }
        return;
      }
    }
    await Order.create({amount, price, total_price:totalPrice, address, date:new Date(), user_id: userId, book_id: id }, {transaction});
    await Book.decrement({amount}, {where: {id}, transaction});
    await transaction.commit();
    ctx.status = 200;
    ctx.body = {
      msg: "success"
    }
  } catch(err) {
    await transaction.rollback();
    ctx.status = 500;
    ctx.body = {
      msg: (err as Error).message,
    };
  }
}