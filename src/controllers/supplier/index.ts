import { addSupply } from "./addSupply";
import { changeInfo } from "./changeInfo";
import { changePassword } from "./changePassword";
import { changeSupply } from "./changeSupply";
import { deleteSupply } from "./deleteSupply";
import { getSupplies } from "./getSupplies";
import { getInfo } from "./info";
import { login } from "./login";
import { register } from "./register";

export class Supplier {
  static login = login;
  static register = register;
  static addSupply = addSupply;
  static changeInfo = changeInfo;
  static changePassword = changePassword;
  static getInfo = getInfo;
  static getSupplies = getSupplies;
  static changeSupply = changeSupply;
  static deleteSupply = deleteSupply;
}