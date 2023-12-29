import Router from "koa-router";
import { Admin } from "../controllers/admin";
const router = new Router();
router.post("/login", Admin.login);
router.get('/users', Admin.getUsersInfo);
router.post("/set_credit", Admin.setCreditLevel)

export default router.routes();