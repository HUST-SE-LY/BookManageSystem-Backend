import { DataTypes, Model, ModelDefined, Optional } from "sequelize";
import { sequelize } from "..";
import bcrypt from 'bcryptjs'

interface SupplierAttributes {
  id: number;//id
  account: string;//账号
  password: string;//密码
  name: string;//名称
  address: string;//出货地址
  phone: string;//手机号
}

type SupplierCreationAttributes = Optional<SupplierAttributes, 'id'>
//供应商

export const Supplier:ModelDefined<SupplierAttributes, SupplierCreationAttributes> = sequelize.define('Supplier', {
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
  address: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
})