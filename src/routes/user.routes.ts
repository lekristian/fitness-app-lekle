import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { JwtAuth } from "../middlewares/authJwt.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";
import { USER_ROLE } from "../db/models/user";
import { UserController } from "../controllers/user.controller";
import validateSchema from "../middlewares/validationSchema.middleware";
import { getUserByIdSchema, updateUserSchema } from "../db/schemas/user.schema";

const router = Router();

const userController = new UserController();

router.get(
  "/",
  JwtAuth,
  authorizeRoles([USER_ROLE.ADMIN]),
  expressAsyncHandler(userController.findAllUsers)
);

router.get(
  "/:id",
  JwtAuth,
  authorizeRoles([USER_ROLE.ADMIN]),
  validateSchema(getUserByIdSchema),
  expressAsyncHandler(userController.findUserById)
);

router.put(
  "/:id",
  JwtAuth,
  authorizeRoles([USER_ROLE.ADMIN]),
  validateSchema(updateUserSchema),
  expressAsyncHandler(userController.updateUser)
);

export default () => router;
