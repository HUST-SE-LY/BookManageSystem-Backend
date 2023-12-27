import Koa from "koa";
import bodyParser from "koa-body";
import koaJwt from "koa-jwt";
import Router from "koa-router";
import jwt from "jsonwebtoken";
import cors from 'koa2-cors'
import user from "./routers/user";
const app:Koa = new Koa();
app.use(cors());
app.use(bodyParser());
app.use(cors());
app.use(
  koaJwt({
    secret: "secret",
  }).unless({
    path: [/^\/api\/login/],
  })
);

const router = new Router({ prefix: "/api" });
router.use('/user', user);
app.use(router.routes());
app.use(router.allowedMethods());
app.use((ctx) => {
  if (ctx.header && ctx.header.authorization) {
    const parts = ctx.header.authorization.split(" ");
    if (parts.length === 2) {
      //取出token
      const scheme = parts[0];
      const token = parts[1];

      if (/^Bearer$/i.test(scheme)) {
        try {
          //jwt.verify方法验证token是否有效
          jwt.verify(token, "secret", {
            complete: true,
          });
        } catch (error) {
          ctx.status = 401;
          ctx.body = {
            msg: "need to update token",
          };
        }
      }
    }
  }
});
const port: number = 3000;

// Moment.sync();

app.listen(port, () => {
  console.log(`local: http://127.0.0.1:${port}`);
});