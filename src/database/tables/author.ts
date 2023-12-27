import { DataTypes, ModelDefined, Optional } from "sequelize";
import { sequelize } from "..";

interface AuthorAttributes {
  id: number;
  name: string;
}

type AuthorCreationAttributes = Optional<AuthorAttributes, 'id'>

//书籍作者表
export const Author:ModelDefined<AuthorAttributes, AuthorCreationAttributes> = sequelize.define('Author', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true,
  },
  name: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
})