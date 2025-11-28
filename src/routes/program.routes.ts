import { Router, Request, Response, NextFunction } from "express";

import { models } from "../db";
import { ProgramController } from "../controllers/program.controller";
import expressAsyncHandler from "express-async-handler";
import { JwtAuth } from "../middlewares/authJwt.middleware";

const router = Router();

const { Program } = models;
const programController = new ProgramController();

router.get(
  "/",
  JwtAuth,
  expressAsyncHandler(programController.findAllPrograms)
);

// TODO: Add validation middleware for :id param
router.get(
  "/:id",
  JwtAuth,
  expressAsyncHandler(programController.findProgramById)
);

export default () => router;
