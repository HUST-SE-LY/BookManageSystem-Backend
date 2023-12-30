import { DataTypes, ModelDefined } from "sequelize";
import { sequelize } from "..";
import { PurchaseRecord } from "./purchaseRecord";
import { Keyword } from "./keyword";

interface PurchaseKeywordAttributes {
  purchase_id: number;
  author_id: number;
}

//订单和作者关联表
export const PurchaseKeyword: ModelDefined<PurchaseKeywordAttributes, {}> =
  sequelize.define("PurchaseKeyword", {
    purchase_id: {
      type: DataTypes.INTEGER,
      references: {
        model: PurchaseRecord,
        key: "id",
      },
    },
    keyword_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Keyword,
        key: "id",
      },
    },
  });