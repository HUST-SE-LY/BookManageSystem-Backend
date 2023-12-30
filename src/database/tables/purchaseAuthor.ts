import { DataTypes, ModelDefined } from "sequelize";
import { sequelize } from "..";
import { Author } from "./author";
import { PurchaseRecord } from "./purchaseRecord";

interface PurchaseAuthorAttributes {
  purchase_id: number;
  author_id: number;
}

//订单和作者关联表
export const PurchaseAuthor: ModelDefined<PurchaseAuthorAttributes, {}> =
  sequelize.define("PurchaseAuthor", {
    purchase_id: {
      type: DataTypes.INTEGER,
      references: {
        model: PurchaseRecord,
        key: "id",
      },
    },
    author_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Author,
        key: "id",
      },
    },
  });