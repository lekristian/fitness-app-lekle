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
  "/getAll",
  JwtAuth,
  authorizeRoles([USER_ROLE.ADMIN]),
  expressAsyncHandler(exerciseController.findAllExercises)
);

router.post(
  "/",
  validateSchema(createExerciseSchema),
  JwtAuth,
  authorizeRoles([USER_ROLE.ADMIN]),
  expressAsyncHandler(exerciseController.createExercise)
);

router.put(
  "/:id",
  validateSchema(updateExerciseSchema),
  JwtAuth,
  authorizeRoles([USER_ROLE.ADMIN]),
  expressAsyncHandler(exerciseController.updateExercise)
);

router.delete(
  "/:id",
  validateSchema(deleteExerciseSchema),
  JwtAuth,
  authorizeRoles([USER_ROLE.ADMIN]),
  expressAsyncHandler(exerciseController.deleteExercise)
);

export default () => router;
