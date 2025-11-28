import { Sequelize, DataTypes, Model } from "sequelize";

export type TokenModel = Model & {
  id: number;
  token: string;
  userId: number;
  blacklistedAt: Date;
  expiresAt: Date | null;
};

// Type for creating a new token (without id and Model methods)
export type TokenCreationAttributes = Omit<Omit<TokenModel, keyof Model>, "id">;

const TokenAttributes = {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  token: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  userId: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: "users",
      key: "id",
    },
    onDelete: "CASCADE",
  },
  blacklistedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
};

export default (sequelize: Sequelize, modelName: string) => {
  const TokenModelCtor = sequelize.define<TokenModel>(
    modelName,
    TokenAttributes,
    {
      paranoid: false,
      timestamps: true,
      tableName: "blacklisted_tokens",
      indexes: [
        {
          name: "idx_blacklisted_tokens_user_expires",
          fields: ["userId", "expiresAt"],
        },
      ],
    }
  );

  return TokenModelCtor;
};
