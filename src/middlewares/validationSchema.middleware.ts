import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

const validateSchema =
  (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      // Pass error to global error handler
      next(error);
    }
  };

export default validateSchema;
