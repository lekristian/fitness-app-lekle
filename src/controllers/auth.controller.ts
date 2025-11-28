import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { loginUserSchema, registerUserSchema } from "../db/schemas/auth.schema";
import ForbiddenError from "../adapters/errors/forbidden.error";
import { ErrorCode } from "../adapters/errors/custom.errors";
import { validateEnv } from "../configs/env.config";
import { hashPassword, signJwt } from "../utils/auth";
import { UserService } from "../services/user.service";
import InternalServerError from "../adapters/errors/internalServer.error";
import BadRequestError from "../adapters/errors/badRequest.error";

export class AuthController {
  private userService = new UserService();

  login = async (req: Request, res: Response) => {
    const validationResult = loginUserSchema.parse(req);
    const { email, password } = validationResult.body;

    try {
      const user = await this.userService.findUserByEmail(email, false);

      if (!user) {
        throw new ForbiddenError("User does not exist", ErrorCode.FORBIDDEN);
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        throw new ForbiddenError("Invalid credentials", ErrorCode.FORBIDDEN);
      }

      const secretKey = validateEnv()?.jwtConfig.accessSecret;
      const refreshSecretKey = validateEnv()?.jwtConfig.refreshAccessSecret;

      const accessToken = signJwt(
        { userId: user.id, email: user.email, roles: user.role },
        secretKey as string,
        {
          expiresIn: "3d",
        }
      );

      const refreshToken = signJwt(
        { userId: user.id, email: user.email, roles: user.role },
        refreshSecretKey as string,
        { expiresIn: "7d" }
      );

      res.status(200).json({
        success: true,
        message: "Logged in successfully",
        accessToken,
        refreshToken,
      });
    } catch (error) {
      throw new InternalServerError(
        "Failed to login user: " + (error as Error),
        ErrorCode.INTERNAL_SERVER
      );
    }
  };

  register = async (req: Request, res: Response) => {
    const validationResult = registerUserSchema.parse(req);

    const { email, password, name, surname, nickName, age, role } =
      validationResult.body;

    try {
      const userExists = await this.userService.findUserByEmail(email);
      if (userExists)
        throw new BadRequestError(
          "User with this email already exists",
          ErrorCode.BAD_REQUEST
        );

      const hashedPassword = await hashPassword(password);

      const newUser = await this.userService.createUser({
        email,
        password: hashedPassword,
        name,
        surname,
        nickName,
        age,
        role,
      });

      const secretKey = validateEnv()?.jwtConfig.accessSecret;
      const refreshSecretKey = validateEnv()?.jwtConfig.refreshAccessSecret;

      const accessToken = signJwt(
        { userId: newUser.id, email: newUser.email, role: newUser.role },
        secretKey as string,
        {
          expiresIn: "3d",
        }
      );
      const refreshToken = signJwt(
        { userId: newUser.id, email: newUser.email, role: newUser.role },
        refreshSecretKey as string,
        { expiresIn: "7d" }
      );

      const createdUser = await this.userService.findUserById(newUser.id);

      res.status(201).json({
        success: true,
        user: createdUser || newUser,
        accessToken,
        refreshToken,
        message: "User created successfully",
      });
    } catch (error) {
      throw new InternalServerError(
        "Failed to register user: " + (error as Error),
        ErrorCode.INTERNAL_SERVER
      );
    }
  };
}
