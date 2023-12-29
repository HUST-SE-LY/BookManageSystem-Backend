import { DataTypes, ModelDefined, Optional } from "sequelize";
import { sequelize } from "..";
import { Supplier } from "./supplier";

interface SupplyAttribute {
  id: number;
  title: string;
  publisher: string;
  price: number;//批发价 
  amount: number;
  supplier_id: number;
}

type SupplyCreationAttribute = Optional<SupplyAttribute, 'id'>

//供应商发布的供书信息
export const Supply:ModelDefined<SupplyAttribute, SupplyCreationAttribute> = sequelize.define('Supply', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true,
  },
  title: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  publisher: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  supplier_id: {
    type: DataTypes.INTEGER,  
    allowNull: false,
    references: {
      model: Supplier,
      key: 'id'
    }
  }
})