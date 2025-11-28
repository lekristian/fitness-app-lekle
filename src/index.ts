import "dotenv/config";
import http from "http";
import express from "express";

import { sequelize } from "./db";
import router from "./routes/index.routes";
import errorHandler from "./middlewares/errorHandler.middleware";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

// Global error handler - must be last
app.use(errorHandler);

const httpServer = http.createServer(app);

try {
  sequelize.sync();
} catch (error) {
  console.log("Sequelize sync error");
}

httpServer
  .listen(8000)
  .on("listening", () => console.log(`Server started at port ${8000}`));

export default httpServer;
