import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { ExerciseController } from "../controllers/exercise.controller";
import { JwtAuth } from "../middlewares/authJwt.middleware";
import validateSchema from "../middlewares/validationSchema.middleware";
import {
  createExerciseSchema,
  updateExerciseSchema,
  deleteExerciseSchema,
} from "../db/schemas/exercise.schema";
import { authorizeRoles } from "../middlewares/role.middleware";
import { USER_ROLE } from "../db/models/user";

const router = Router();

const exerciseController = new ExerciseController();

router.get(
  "/",
  JwtAuth,
  authorizeRoles([USER_ROLE.ADMIN]),
  expressAsyncHandler(exerciseController.findAllExercises)
);

router.post(
  "/",
  JwtAuth,
  authorizeRoles([USER_ROLE.ADMIN]),
  validateSchema(createExerciseSchema),
  expressAsyncHandler(exerciseController.createExercise)
);

router.put(
  "/:id",
  JwtAuth,
  authorizeRoles([USER_ROLE.ADMIN]),
  validateSchema(updateExerciseSchema),
  expressAsyncHandler(exerciseController.updateExercise)
);

router.delete(
  "/:id",
  JwtAuth,
  authorizeRoles([USER_ROLE.ADMIN]),
  validateSchema(deleteExerciseSchema),
  expressAsyncHandler(exerciseController.deleteExercise)
);

export default () => router;
