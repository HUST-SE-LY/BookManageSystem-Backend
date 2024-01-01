import { getSupplies } from "./getSupplies";
import { addMissingRecord } from "./addMissingRecord";
import { changeMissingRecord } from "./changeMissingRecord";
import { deleteMissingRecord } from "./deleteMissingRecord";
import { getUsersInfo } from "./getUsersInfo";
import { login } from "./login";
import { setCreditLevel } from "./setCreditLevel";
import { getMissingRecords } from "./getMissingRecords";
import { addPurchaseRecord } from "./addPurchaseRecord";
import { finishPurchase } from "./finishPurchase";
import { getPurchaseRecord } from "./getPurchaseRecord";
import { getBook } from "./getBook";
import { setBookPrice } from "./setBookPrice";
import { startSaleBook } from "./startSaleBook";
import { UnSaleBook } from "./setUnsale";
import { getOrders } from "./getOrders";
import { startDeliver } from "./startDeliver";

export class Admin {
  static login = login;
  static getUsersInfo = getUsersInfo;
  static setCreditLevel = setCreditLevel;
  static addMissingRecord = addMissingRecord;
  static getSupplies = getSupplies;
  static getMissingRecords = getMissingRecords;
  static changeMissingRecord = changeMissingRecord;
  static deleteMissingRecord = deleteMissingRecord;
  static addPurchaseRecord = addPurchaseRecord;
  static getPurchaseRecord = getPurchaseRecord;
  static finishPurchase= finishPurchase;
  static getBook = getBook;
  static setBookPrice = setBookPrice;
  static startSaleBook = startSaleBook;
  static unSaleBook = UnSaleBook;
  static getOrders = getOrders;
  static startDeliver = startDeliver;
}