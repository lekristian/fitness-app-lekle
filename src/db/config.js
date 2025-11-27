const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
  DB_HOST,
  DB_PORT = "5432",
} = process.env;

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD === "" ? null : DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    port: Number(DB_PORT) || 5432,
    dialect: "postgres",
  },
};
