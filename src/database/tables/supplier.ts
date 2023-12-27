import { DataTypes, Model, ModelDefined, Optional } from "sequelize";
import { sequelize } from "..";
import bcrypt from 'bcryptjs'

interface SupplierAttributes {
  id: number;
  account: string;
  password: string;
  name: string;
  address: string;
  phone: string;
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