import Router from "koa-router";
import { Admin } from "../controllers/admin";
const router = new Router();
router.post("/login", Admin.login);
router.get("/users", Admin.getUsersInfo);
router.post("/set_credit", Admin.setCreditLevel);
router.get("/supply", Admin.getSupplies);
router.post('/add_missing_record', Admin.addMissingRecord)
router.delete("/missing_record", Admin.deleteMissingRecord);
router.post("/change_missing_record", Admin.changeMissingRecord);
router.get("/missing_record", Admin.getMissingRecords);
router.post('/purchase', Admin.addPurchaseRecord);
router.get('/purchase', Admin.getPurchaseRecord);
router.post('/finish_purchase', Admin.finishPurchase)
router.get('/book', Admin.getBook)
router.post('/price', Admin.setBookPrice);
router.post('/sale', Admin.startSaleBook)
router.post('/unsale', Admin.unSaleBook);
router.get('/order', Admin.getOrders);
router.post('/deliver', Admin.startDeliver);
export default router.routes();
