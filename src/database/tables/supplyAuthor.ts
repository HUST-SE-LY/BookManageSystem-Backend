import { DataTypes, ModelDefined } from "sequelize";
import { sequelize } from "..";
import { Supply } from "./supply";
import { Author } from "./author";

interface SupplyAuthorAttribute {
  supply_id: string;
  author_id: string;
}
//供应商提供的可采购书籍与作者的关联表
export const SupplyAuthor:ModelDefined<SupplyAuthorAttribute, {}> = sequelize.define("SupplyAuthor", {
  supply_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Supply,
      key: 'id',
    }
  },
  author_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Author,
      key: "id",
    },
  }
})