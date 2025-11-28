import { Request, Response, NextFunction } from "express";

import { USER_ROLE } from "../db/models/user";
import { ForbiddenError } from "../adapters/errors/index.error";
import { ErrorCode } from "../adapters/errors/custom.errors";

export const authorizeRoles = (allowedRoles: USER_ROLE[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    // Check if the user has allowed role
    const hasRole = allowedRoles.includes(user.role);

    if (!hasRole) {
      throw new ForbiddenError("Access denied", ErrorCode.FORBIDDEN);
    }

    next();
  };
};
