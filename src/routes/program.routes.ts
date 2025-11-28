import { Router } from "express";
import { ProgramController } from "../controllers/program.controller";
import expressAsyncHandler from "express-async-handler";
import { JwtAuth } from "../middlewares/authJwt.middleware";
import validateSchema from "../middlewares/validationSchema.middleware";
import {
  addExerciseToProgramSchema,
  removeExerciseFromProgramSchema,
} from "../db/schemas/program.schema";
import { authorizeRoles } from "../middlewares/role.middleware";
import { USER_ROLE } from "../db/models/user";

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
  authorizeRoles([USER_ROLE.ADMIN]),

  validateSchema(addExerciseToProgramSchema),

  expressAsyncHandler(programController.addExerciseToProgram)
);

router.delete(
  "/:id/exercises/:exerciseId",
  JwtAuth,
  authorizeRoles([USER_ROLE.ADMIN]),
  validateSchema(removeExerciseFromProgramSchema),
  expressAsyncHandler(programController.removeExerciseFromProgram)
);

export default () => router;
