import Koa from "koa";
import bodyParser from "koa-body";
import koaJwt from "koa-jwt";
import Router from "koa-router";
import jwt from "jsonwebtoken";
import cors from "koa2-cors";
import user from "./routers/user";
import root from "./routers";
import admin from "./routers/admin";
import supplier from "./routers/supplier";
import { User } from "./database/tables/user";
import dotenv from "dotenv";
import { TokenType } from "./type";
import { Supplier } from "./database/tables/supplier";
import { Supply } from "./database/tables/supply";
import { Author } from "./database/tables/author";
import { Keyword } from "./database/tables/keyword";
import { SupplyAuthor } from "./database/tables/supplyAuthor";
import { SupplyKeyword } from "./database/tables/supplyKeyword";
//加载.env环境变量
dotenv.config();
const app: Koa = new Koa();
app.use(cors());
app.use(bodyParser());
app.use(
  koaJwt({
    secret: process.env.SECRET as string,
    debug: true,
  }).unless({
    path: [
      /^\/api\/user\/login/,
      /^\/api\/user\/register/,
      /^\/api\/supplier/,
      /^\/api\/admin/,
      /^\/api\/user_type/,
    ],
  })
);

app.use(
  koaJwt({
    secret: process.env.ADMIN_SECRET as string,
    debug: true,
  }).unless({
    path: [
      /^\/api\/user/,
      /^\/api\/supplier/,
      /^\/api\/admin\/login/,
      /^\/api\/user_type/,
    ],
  })
);

app.use(
  koaJwt({
    secret: process.env.SUPPLIER_SECRET as string,
    debug: true,
  }).unless({
    path: [
      /^\/api\/user/,
      /^\/api\/admin/,
      /^\/api\/supplier\/login/,
      /^\/api\/supplier\/register/,
      /^\/api\/user_type/,
    ],
  })
);

app.use(async (ctx, next) => {
  console.log(ctx.url);
  if (ctx.url.endsWith("register") || ctx.url.endsWith("login")) {
    await next();
  } else if (ctx.header && ctx.header.authorization) {
    const parts = ctx.header.authorization.split(" ");
    if (parts.length === 2) {
      const scheme = parts[0];
      const token = parts[1];
      if (/^Bearer$/i.test(scheme)) {
        let type;
        if (ctx.url === "/api/user_type") {
          const res = jwt.decode(token, { complete: true });
          console.log(res?.payload);
          type = (res?.payload as TokenType).type;
        }
        try {
          let secret;
          (ctx.url.startsWith("/api/user") || type === "user") &&
            (secret = process.env.SECRET as string);
          (ctx.url.startsWith("/api/admin") || type === "admin") &&
            (secret = process.env.ADMIN_SECRET as string);
          (ctx.url.startsWith("/api/supplier") || type === "supplier") &&
            (secret = process.env.SUPPLIER_SECRET as string);
          const decode = jwt.verify(token, secret as string, {
            complete: true,
          });
          ctx.auth = decode.payload;
        } catch (error) {
          ctx.status = 401;
          ctx.body = {
            msg: "need to update token",
          };
        }
        await next();
      }
    }
  } else {
    ctx.status = 401;
    ctx.body = {
      msg: "need token",
    };
  }
});

const router = new Router({ prefix: "/api" });
router.use("/", root);
router.use("/user", user);
router.use("/admin", admin);
router.use("/supplier", supplier);
app.use(router.routes());
app.use(router.allowedMethods());

const port: number = 3000;

User.sync();
Supplier.sync();
Supply.sync();
Author.sync();
Keyword.sync();
SupplyAuthor.sync();
SupplyKeyword.sync();
Supply.belongsToMany(Author, {
  through: SupplyAuthor,
  foreignKey: "supply_id",
  otherKey: "author_id",
});
Supply.belongsToMany(Keyword, {
  through: SupplyKeyword,
  foreignKey: "supply_id",
  otherKey: "keyword_id",
});
Author.belongsToMany(Supply, {
  through: SupplyAuthor,
  foreignKey: "author_id",
  otherKey: "supply_id",
});
Keyword.belongsToMany(Supply, {
  through: SupplyKeyword,
  foreignKey: "keyword_id",
  otherKey: "supply_id",
});

app.listen(port, () => {
  console.log(`local: http://127.0.0.1:${port}`);
});
