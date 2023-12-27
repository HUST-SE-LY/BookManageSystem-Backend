import { DataTypes, Optional } from "sequelize";
import { sequelize } from "..";

interface OrderAttributes {
  id: number;
  date: string;
  user_id: number;
  book_id: number;
  amount: number;
  price: number;
  address: string;
  has_deliver: boolean;
}

type OrderCreationDeliver = Optional<OrderAttributes, 'id'|'has_deliver'>

//订单
export const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  book_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  has_deliver: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  }
})