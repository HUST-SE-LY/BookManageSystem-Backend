import { getUsersInfo } from "./getUsersInfo";
import { login } from "./login";
import { setCreditLevel } from "./setCreditLevel";

export class Admin {
  static login = login;
  static getUsersInfo = getUsersInfo;
  static setCreditLevel = setCreditLevel;
}