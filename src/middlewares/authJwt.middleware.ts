import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { validateEnv } from "../configs/env.config";
import { extractTokenFromHeader } from "../helpers/auth.helpers";
import UnAuthenticatedError from "../adapters/errors/unAuthenticated.error";
import { ErrorCode } from "../adapters/errors/custom.errors";
import ForbiddenError from "../adapters/errors/forbidden.error";
import InternalServerError from "../adapters/errors/internalServer.error";
import { models } from "../db";

export const JwtAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tokenRepository = models.Token;
  const userRepository = models.User;
  try {
    const jwtConfig = validateEnv()?.jwtConfig;
    const token = extractTokenFromHeader(req);
    if (!token)
      throw new UnAuthenticatedError(
        "Provide token",
        ErrorCode.TOKEN_NOT_FOUND
      );

    const blacklistedToken = await tokenRepository.findOne({
      where: { token },
    });
    if (blacklistedToken) {
      throw new ForbiddenError("Token expires", ErrorCode?.TOKEN_BLACKLISTED);
    }

    const accessSecret = jwtConfig?.accessSecret as string;

    const decoded = jwt.verify(token, accessSecret) as jwt.JwtPayload;

    const user = await userRepository.findOne({
      where: { id: decoded.userId },
    });

    if (!user) throw new ForbiddenError("Invalid token", ErrorCode.FORBIDDEN);

    req.user = user;

    next();

    // eslint-disable-next-line
  } catch (error: any) {
    throw new UnAuthenticatedError(
      "Authentication failed",
      ErrorCode.TOKEN_NOT_FOUND
    );
  }
};
