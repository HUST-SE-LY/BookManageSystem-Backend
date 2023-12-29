import Router from "koa-router";
import { Supplier } from "../controllers/supplier";

const router = new Router();
router.post('/register', Supplier.register);
router.post('/login', Supplier.login);
router.post('/change_info', Supplier.changeInfo);
router.post("/change_password", Supplier.changePassword);
router.post('/add_supply', Supplier.addSupply)
router.get('/info', Supplier.getInfo)
router.get('/supplies', Supplier.getSupplies)
router.delete('/supply', Supplier.deleteSupply)
router.post('/change_supply', Supplier.changeSupply);
export default router.routes();