import { DataTypes, Model, ModelDefined, Optional } from "sequelize";
import { sequelize } from "..";
import { Supplier } from "./supplier";
import { AuthorAttributes } from "./author";
import { KeywordAttributes } from "./keyword";

export interface SupplyAttribute {
  id: number;//id
  title: string;//书名
  publisher: string;
  price: number;//批发价 
  amount: number;//供货量
  supplier_id: number;//供货商id
  Authors: AuthorAttributes[];
  Keywords: KeywordAttributes[];
}

type SupplyCreationAttribute = Optional<SupplyAttribute, 'id'|'Authors'|'Keywords'>

export interface SupplyModel extends Model<SupplyAttribute, SupplyCreationAttribute> {
  setAuthors: Function;
  setKeywords: Function;
}
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