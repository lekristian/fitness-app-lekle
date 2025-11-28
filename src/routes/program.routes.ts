import { Router } from "express";
import { ProgramController } from "../controllers/program.controller";
import expressAsyncHandler from "express-async-handler";
import { JwtAuth } from "../middlewares/authJwt.middleware";
import validateSchema from "../middlewares/validationSchema.middleware";
import {
  addExerciseToProgramSchema,
  removeExerciseFromProgramSchema,
} from "../db/schemas/program.schema";

const router = Router();

const programController = new ProgramController();

router.get(
  "/",
  JwtAuth,
  expressAsyncHandler(programController.findAllPrograms)
);

router.get(
  "/:id",
  JwtAuth,
  expressAsyncHandler(programController.findProgramById)
);

router.post(
  "/:id/exercises",
  JwtAuth,
  validateSchema(addExerciseToProgramSchema),
  expressAsyncHandler(programController.addExerciseToProgram)
);

router.delete(
  "/:id/exercises/:exerciseId",
  JwtAuth,
  validateSchema(removeExerciseFromProgramSchema),
  expressAsyncHandler(programController.removeExerciseFromProgram)
);

export default () => router;
