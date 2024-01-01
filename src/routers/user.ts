import Router from "koa-router";
import { User } from "../controllers/user";

const router = new Router();

router.post("/register", User.register);//客户注册
router.post("/login", User.login);//客户登录
router.get("/info", User.getInfo);//客户获取个人信息
router.post("/top_up", User.topUp);//客户充值
router.post("/change_password", User.changePassword);//客户修改密码
router.post("/change_info", User.changeInfo);//客户修改个人信息
router.get('/book', User.getBooks);//客户获取书店书籍
router.post('/buy', User.buyBook);//客户下单
router.post("/confirm", User.confirmOrder);//客户确认收货
router.get("/order", User.getOrders)//客户获取自己的订单

export default router.routes();
