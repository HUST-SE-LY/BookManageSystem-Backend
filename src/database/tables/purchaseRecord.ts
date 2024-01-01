//书店采购记录，跟缺书记录关联

import { DataTypes, Model, ModelDefined, Optional } from "sequelize";
import { sequelize } from "..";
import { MissingRecord } from "./missingRecord";
import { AuthorAttributes } from "./author";
import { KeywordAttributes } from "./keyword";

interface PurchaseRecordAttributes {
  id: number;//id
  record_id: number;//对应缺书记录的id
  amount: number;//采购数量
  title: string;//书名
  price: number;//价格
  publisher: string;//出版商
  ok: boolean;//采购送达状态
  book_id: number;
  Authors: AuthorAttributes[];
  Keywords: KeywordAttributes[];
}

type PurchaseRecordCreationAttributes = Optional<PurchaseRecordAttributes, 'id'|'ok'|'Authors'|'Keywords'|"book_id">

export interface PurchaseRecordModel extends Model<PurchaseRecordAttributes, PurchaseRecordCreationAttributes> {
  setAuthors: Function;
  setKeywords: Function;
}

export const PurchaseRecord:ModelDefined<PurchaseRecordAttributes, PurchaseRecordCreationAttributes> = sequelize.define("PurchaseRecord",{
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true,
  },
  record_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
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
    allowNull: false,
  },
  ok: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  book_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  }
})
