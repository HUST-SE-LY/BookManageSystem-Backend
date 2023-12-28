import Koa from "koa";
import bodyParser from "koa-body";
import koaJwt from "koa-jwt";
import Router from "koa-router";
import jwt from "jsonwebtoken";
import cors from "koa2-cors";
import user from "./routers/user";
import root from './routers'
import { User } from "./database/tables/user";
const app: Koa = new Koa();
app.use(cors());
app.use(bodyParser());
app.use(
  koaJwt({
    secret: "secret",
  }).unless({
    path: [/^\/api\/user\/login/, /^\/api\/user\/register/],
  })
);

app.use(async (ctx, next) => {
  if (ctx.url === "/api/user/register" || ctx.url === "/api/user/login") {
    await next();
  } else if (ctx.header && ctx.header.authorization) {
    const parts = ctx.header.authorization.split(" ");
    if (parts.length === 2) {
      //取出token
      const scheme = parts[0];
      const token = parts[1];

      if (/^Bearer$/i.test(scheme)) {
        try {
          //jwt.verify方法验证token是否有效
          const decode = jwt.verify(token, process.env.SECRET||"secret", {
            complete: true,
          });
          ctx.auth = decode.payload;
          console.log(ctx.auth)
          await next();
        } catch (error) {
          ctx.status = 401;
          ctx.body = {
            msg: "need to update token",
          };
        }
      }
    }
  } else {
    ctx.status = 401;
    ctx.body = {
      msg: 'need token'
    }
  }
});

const router = new Router({ prefix: "/api" });
router.use('/', root)
router.use("/user", user);
app.use(router.routes());
app.use(router.allowedMethods());

const port: number = 3000;

User.sync();

app.listen(port, () => {
  console.log(`local: http://127.0.0.1:${port}`);
});
