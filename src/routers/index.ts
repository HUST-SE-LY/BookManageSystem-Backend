import Router from "koa-router";
import { Root } from "../controllers";

const router = new Router();
router.get('user_type', Root.judgeUserType)

export default router.routes();