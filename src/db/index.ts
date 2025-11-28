import fs from "fs";
import { Sequelize } from "sequelize";

import defineExercise from "./models/exercise";
import defineProgram from "./models/program";
import defineUser from "./models/user";
import defineToken from "./models/token";
import { config } from "../configs/env.config";

const sequelize: Sequelize = new Sequelize(
  `postgresql://${config.db.host}:${config.db.port}/${config.db.name}`,
  {
    logging: false,
  }
);

sequelize
  .authenticate()
  .catch((e: any) => console.error(`Unable to connect to the database${e}.`));

const Exercise = defineExercise(sequelize, "exercise");
const Program = defineProgram(sequelize, "program");
const User = defineUser(sequelize, "user");
const Token = defineToken(sequelize, "token");

const models = {
  Exercise,
  Program,
  User,
  Token,
};
type Models = typeof models;

// check if every model is imported
const modelsDir = `${__dirname}/models`;
const modelsFiles = fs.existsSync(modelsDir)
  ? fs
      .readdirSync(modelsDir)
      .filter((file) => file.endsWith(".ts") && !file.startsWith("index"))
  : [];
if (Object.keys(models).length !== modelsFiles.length) {
  throw new Error("You probably forgot import database model!");
}

Object.values(models).forEach((value: any) => {
  if (value.associate) {
    value.associate(models);
  }
});

export { models, sequelize };
export type { Models };
