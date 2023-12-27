import { DataTypes, Model, ModelDefined, Optional } from "sequelize";
import { sequelize } from "..";
import bcrypt from "bcryptjs";

interface UserAttributes {
  id: number;
  account: string;
  password: string;
  name: string;
  credit_level: number;
  address: string;
  phone: string;
  remain: number
}

type UserCreationAttributes = Optional<UserAttributes, 'id'|'credit_level'|'remain'>

//客户
export const User:ModelDefined<UserAttributes, UserCreationAttributes> = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true,
  },
  account: {
    type: DataTypes.STRING(30),
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false,
    set(val:string) {
      const sault = bcrypt.genSaltSync(10);
      const psw = bcrypt.hashSync(val, sault);
      this.setDataValue('password', psw);
    },
  },
  credit_level: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  address: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  remain: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
});
