import Router from "koa-router";
import { Supplier } from "../controllers/supplier";

const router = new Router();
router.post('/register', Supplier.register);//供货商注册
router.post('/login', Supplier.login);//供货商登录
router.post('/change_info', Supplier.changeInfo);//供货商修改信息
router.post("/change_password", Supplier.changePassword);//供货商修改密码
router.post('/add_supply', Supplier.addSupply)//供货商新增供货信息
router.get('/info', Supplier.getInfo)//供货商获取个人信息
router.get('/supplies', Supplier.getSupplies)//供货商获取自己的供货信息
router.delete('/supply', Supplier.deleteSupply)//供货商删除供货信息
router.post('/change_supply', Supplier.changeSupply);//供货商修改供货信息
export default router.routes();