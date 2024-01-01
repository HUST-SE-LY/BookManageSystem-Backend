//缺书记录表，与supply表关联

import { DataTypes, ModelDefined, Optional } from "sequelize";
import { sequelize } from "..";
import { Supply, SupplyAttribute } from "./supply";

interface MissingRecordAttributes {
  id: number;//id
  supply_id: number;//对应供货信息的id
  amount: number;//登记数目
  purchase: boolean;//是否已采购
  Supply: SupplyAttribute;
}

type MissingRecordCreationAttributes = Optional<MissingRecordAttributes, "id"|"purchase"|'Supply'>;

export const MissingRecord:ModelDefined<MissingRecordAttributes, MissingRecordCreationAttributes> = sequelize.define('MissingRecord', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true,
  },
  supply_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Supply,
      key: 'id',
    }
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  purchase: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  }
})