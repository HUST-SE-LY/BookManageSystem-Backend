import Router from "koa-router";
import { User } from "../controllers/user";

const router = new Router();

router.post('/register', User.register);
router.post('/login', User.login)
router.get('/info', User.getInfo)
export default router.routes()