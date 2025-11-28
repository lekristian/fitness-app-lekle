import express from "express";
import ProgramRouter from "./programs";
import ExerciseRouter from "./exercises";
import AuthRouter from "./auth.routes";

const router = express.Router();

router.use("/programs", ProgramRouter());
router.use("/exercises", ExerciseRouter());

router.use("/auth", AuthRouter());

export default router;
