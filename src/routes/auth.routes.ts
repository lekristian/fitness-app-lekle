import { Router } from "express";
import validateSchema from "../middlewares/validationSchema.middleware";
import {
  getUserByEmailSchema,
  loginUserSchema,
  registerUserSchema,
} from "../db/schemas/auth.schema";
import asyncHandler from "express-async-handler";
import { AuthController } from "../controllers/auth.controller";

const router = Router();
const authController = new AuthController();

router.post(
  "/login",
  validateSchema(loginUserSchema),
  asyncHandler(authController.login)
);

router.post(
  "/register",
  validateSchema(registerUserSchema),
  asyncHandler(authController.register)
);

export default () => router;
