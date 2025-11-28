import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import CustomAPIError from "../adapters/errors/custom.errors";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Zod validation errors
  if (err instanceof ZodError) {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: err.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
    return;
  }

  // Custom API errors
  if (err instanceof CustomAPIError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errorCode: err.errorCode,
      ...(process.env.NODE_ENV === "development" && { error: err.error }),
    });
    return;
  }

  // Generic errors
  console.error("Unhandled error:", err);
  res.status(500).json({
    success: false,
    message: "Something went wrong",
    ...(process.env.NODE_ENV === "development" && {
      error: err.message,
      stack: err.stack,
    }),
  });
};

export default errorHandler;
