import { changeInfo } from "./changeInfo";
import { changePassword } from "./changePassword";
import { getInfo } from "./info";
import { login } from "./login";
import { register } from "./register";
import { topUp } from "./topUp";

export class User {
  static register = register;
  static login = login;
  static getInfo = getInfo;
  static topUp = topUp;
  static changeInfo = changeInfo;
  static changePassword = changePassword;
}