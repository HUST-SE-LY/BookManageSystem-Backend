import { DataTypes } from "sequelize";
import { sequelize } from "..";
import { Book } from "./book";
import { Keyword } from "./keyword";
import { Supplier } from "./supplier";

//书店书籍和供应商关联表
export const BookSupplier= sequelize.define('BookSupplier', {
  book_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Book,
      key: 'id',
    }
  },
  supplier_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Supplier,
      key: 'id',
    }
  }
})