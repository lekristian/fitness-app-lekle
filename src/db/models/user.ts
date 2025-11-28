import { Sequelize, DataTypes, Model } from "sequelize";

export enum USER_ROLE {
  ADMIN = "ADMIN",
  USER = "USER",
}

export type UserModel = Model & {
  id: number;
  name: string;
  surname: string;
  nickName: string;
  email: string;
  password: string;
  age?: number;
  role: USER_ROLE;
};

// Type for creating a new user (without id and Model methods)
export type UserCreationAttributes = Omit<Omit<UserModel, keyof Model>, "id">;

// Attributes to return (excluding sensitive data)
export const USER_SAFE_ATTRIBUTES: (keyof Omit<UserModel, keyof Model>)[] = [
  "id",
  "name",
  "surname",
  "nickName",
  "email",
  "age",
  "role",
];

const UserAttributes = {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(200),
  },
  surname: {
    type: DataTypes.STRING(200),
  },
  nickName: {
    type: DataTypes.STRING(200),
    unique: true,
  },
  email: {
    type: DataTypes.STRING(200),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
  },
  role: {
    type: DataTypes.ENUM(...Object.values(USER_ROLE)),
    allowNull: false,
    defaultValue: USER_ROLE.USER,
  },
};

export default (sequelize: Sequelize, modelName: string) => {
  const UserModelCtor = sequelize.define<UserModel>(modelName, UserAttributes, {
    paranoid: true,
    timestamps: true,
    tableName: "users",
  });

  return UserModelCtor;
};
