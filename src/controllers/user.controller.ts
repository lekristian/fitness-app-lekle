import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import ForbiddenError from "../adapters/errors/forbidden.error";
import { ErrorCode } from "../adapters/errors/custom.errors";
import InternalServerError from "../adapters/errors/internalServer.error";

export class UserController {
  private userService = new UserService();

  findAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await this.userService.findAllUsersHandler();
      res.status(200).json({
        success: true,
        data: users,
        message: "List of users",
      });
    } catch (error) {
      throw new InternalServerError(
        "Failed to retrieve user: " + (error as Error).message,
        ErrorCode.INTERNAL_SERVER
      );
    }
  };

  findUserById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await this.userService.findUserByIdHandler(Number(id));

      if (!user) {
        throw new ForbiddenError("User not found", ErrorCode.NOT_FOUND);
      }

      res.status(200).json({
        success: true,
        data: user,
        message: "User details",
      });
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw error;
      }
      throw new InternalServerError(
        "Failed to retrieve user: " + (error as Error).message,
        ErrorCode.INTERNAL_SERVER
      );
    }
  };

  updateUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, surname, nickName, age, role } = req.body;

      const updatedUser = await this.userService.updateUserHandler(Number(id), {
        name,
        surname,
        nickName,
        age,
        role,
      });
      if (!updatedUser) {
        throw new ForbiddenError("User not found", ErrorCode.NOT_FOUND);
      }
      res.status(200).json({
        success: true,
        data: updatedUser,
        message: "User updated successfully",
      });
    } catch (error) {
      throw new InternalServerError(
        "Failed to update user: " + (error as Error).message,
        ErrorCode.INTERNAL_SERVER
      );
    }
  };
}
