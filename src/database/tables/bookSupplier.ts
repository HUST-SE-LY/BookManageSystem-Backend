import { DataTypes, ModelDefined } from "sequelize";
import { sequelize } from "..";
import { Book } from "./book";
import { Supplier } from "./supplier";

interface BookSupplierAttributes {
  book_id: number;
  supplier_id: number;
}

//书店书籍和供应商关联表
export const BookSupplier:ModelDefined<BookSupplierAttributes,{}>= sequelize.define('BookSupplier', {
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