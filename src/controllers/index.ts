import { Context } from "koa";
import { TokenType } from "../type";

export class Root {
  static async judgeUserType(ctx: Context) {
    const type = (ctx.auth as TokenType).type;
    ctx.status = 200;
    ctx.body = {
      type,
    }
  }
}