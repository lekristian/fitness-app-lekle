import { Router } from "express";
import ProgramRouter from "./program.routes";
import AuthRouter from "./auth.routes";
import ExerciseRouter from "./exercise.routes";
import UsesRouter from "./user.routes";

const router = Router();

router.use("/programs", ProgramRouter());
router.use("/exercises", ExerciseRouter());
router.use("/users", UsesRouter());

router.use("/auth", AuthRouter());

export default router;
