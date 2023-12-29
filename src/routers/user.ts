import Router from "koa-router";
import { User } from "../controllers/user";

const router = new Router();

router.post("/register", User.register);
router.post("/login", User.login);
router.get("/info", User.getInfo);
router.post("/top_up", User.topUp);
router.post("/change_password", User.changePassword);
router.post("/change_info", User.changeInfo);
export default router.routes();
