import { addSupply } from "./addSupply";
import { login } from "./login";
import { register } from "./register";

export class Supplier {
  static login = login;
  static register = register;
  static addSupply = addSupply
}