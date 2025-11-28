import { Router, Request, Response, NextFunction } from "express";

import { models } from "../db";
import expressAsyncHandler from "express-async-handler";
import { ExerciseController } from "../controllers/exercise.controller";
import { JwtAuth } from "../middlewares/authJwt.middleware";

const router = Router();

const exercisesController = new ExerciseController();

router.get(
  "/getAll",
  JwtAuth,
  expressAsyncHandler(exercisesController.findAllExercises)
);

export default () => router;
