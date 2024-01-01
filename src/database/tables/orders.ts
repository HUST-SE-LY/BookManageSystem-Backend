import { DataTypes, ModelDefined, Optional } from "sequelize";
import { sequelize } from "..";

interface OrderAttributes {
  id: number;//订单号
  date: Date;//日期
  user_id: number;//用户id
  book_id: number;//书号
  amount: number;//数量
  price: number;//价格
  address: string;//地址
  has_deliver: boolean;//是否发货
  has_get: boolean;//是否收货
  total_price: number;//总价
}

type OrderCreationAttributes = Optional<OrderAttributes, 'id'|'has_deliver'|'has_get'>

//订单
export const Order:ModelDefined<OrderAttributes, OrderCreationAttributes> = sequelize.define('Order', {
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
  },
  has_get: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  total_price: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
})