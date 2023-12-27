import { login } from "./login";
import { register } from "./register";

export class User {
  static register = register;
  static login = login;
}