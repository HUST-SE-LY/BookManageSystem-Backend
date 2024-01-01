import Router from "koa-router";
import { Admin } from "../controllers/admin";
const router = new Router();
router.post("/login", Admin.login);//管理员登录
router.get("/users", Admin.getUsersInfo);//管理员获取用户信息
router.post("/set_credit", Admin.setCreditLevel);//管理员设置用户信用等级
router.get("/supply", Admin.getSupplies);//管理员获取所有供应商供书
router.post('/add_missing_record', Admin.addMissingRecord)//管理员生成缺书记录
router.delete("/missing_record", Admin.deleteMissingRecord);//管理员删除缺书记录
router.post("/change_missing_record", Admin.changeMissingRecord);//管理员修改缺书记录
router.get("/missing_record", Admin.getMissingRecords);//管理员获取缺书记录
router.post('/purchase', Admin.addPurchaseRecord);//管理员采购，生成采购单
router.get('/purchase', Admin.getPurchaseRecord);//管理员获取采购单
router.post('/finish_purchase', Admin.finishPurchase)//管理员设置采购单到货
router.get('/book', Admin.getBook);//管理员获取书店现有图书
router.post('/price', Admin.setBookPrice);//管理员设置图书定价
router.post('/sale', Admin.startSaleBook);//管理员上架图书
router.post('/unsale', Admin.unSaleBook);//管理员下架图书
router.get('/order', Admin.getOrders);//管理员获取所有客户订单
router.post('/deliver', Admin.startDeliver);//管理员对客户订单发货
export default router.routes();
