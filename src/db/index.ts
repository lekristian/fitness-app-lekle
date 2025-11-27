import fs from "fs";
import { Sequelize } from "sequelize";

import defineExercise from "./models/exercise";
import defineProgram from "./models/program";

const sequelize: Sequelize = new Sequelize(
  `postgresql://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  {
    logging: false,
  }
);

sequelize
  .authenticate()
  .catch((e: any) => console.error(`Unable to connect to the database${e}.`));

const Exercise = defineExercise(sequelize, "exercise");
const Program = defineProgram(sequelize, "program");

const models = {
  Exercise,
  Program,
};
type Models = typeof models;

// check if every model is imported
const modelsDir = `${__dirname}/models`;
const modelsFiles = fs.existsSync(modelsDir) ? fs.readdirSync(modelsDir) : [];
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
