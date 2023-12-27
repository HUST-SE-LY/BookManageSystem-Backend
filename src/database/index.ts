import { Sequelize } from "sequelize";
import { config } from "./config";
const { database, user, password, host, port } = config.database;
export const sequelize = new Sequelize(database, user, password, {
  dialect: "mysql",
  host,
  port,
  logging: console.log,
  timezone: "+08:00",
  dialectOptions: {
    dateStrings: true,
    typeCast: true,
  }
});