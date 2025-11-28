import { Router } from "express";
import ProgramRouter from "./program.routes";
import AuthRouter from "./auth.routes";
import ExerciseRouter from "./exercise.routes";

const router = Router();

router.use("/programs", ProgramRouter());
router.use("/exercises", ExerciseRouter());

router.use("/auth", AuthRouter());

export default router;
