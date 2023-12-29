import Router from "koa-router";
import { Supplier } from "../controllers/supplier";

const router = new Router();
router.post('/register', Supplier.register);
router.post('/login', Supplier.login);
router.post('/add_supply', Supplier.addSupply)
export default router.routes();