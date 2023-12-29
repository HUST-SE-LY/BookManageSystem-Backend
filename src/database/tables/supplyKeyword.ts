import { DataTypes, ModelDefined } from "sequelize";
import { sequelize } from "..";
import { Keyword } from "./keyword";
import { Supply } from "./supply";

interface SupplyKeywordAttributes {
  supply_id: number;
  keyword_id: number;
}

//供应商发布的供书信息与关键词的关联表
export const SupplyKeyword:ModelDefined<SupplyKeywordAttributes,{}> = sequelize.define('SupplyKeyword', {
  supply_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Supply,
      key: 'id',
    }
  },
  keyword_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Keyword,
      key: 'id',
    }
  }
})