import { Request, Response } from "express";
import { ExerciseService } from "../services/exercise.service";
import { ErrorCode } from "../adapters/errors/custom.errors";
import {
  createExerciseSchema,
  updateExerciseSchema,
} from "../db/schemas/exercise.schema";
import InternalServerError from "../adapters/errors/internalServer.error";
import ForbiddenError from "../adapters/errors/forbidden.error";

export class ExerciseController {
  private exerciseService = new ExerciseService();

  findAllExercises = async (req: Request, res: Response) => {
    try {
      const exercises = await this.exerciseService.findAllExercisesHandler();

      res.status(200).json({
        success: true,
        data: exercises,
        message: "List of exercises",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve exercises",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  createExercise = async (req: Request, res: Response) => {
    try {
      const validationResult = createExerciseSchema.parse(req);

      const { name, difficulty, programID } = validationResult.body;

      const exercise = await this.exerciseService.createExerciseHandler({
        name,
        difficulty,
        programID,
      });

      res.status(200).json({
        success: true,
        data: exercise,
        message: "Exercise created successfully",
      });
    } catch (error) {
      throw new InternalServerError(
        "Failed to create exercise: " + (error as Error),
        ErrorCode.INTERNAL_SERVER
      );
    }
  };

  updateExercise = async (req: Request, res: Response) => {
    try {
      //todo: parse from params schema
      const { id } = req.params;
      const validationResult = updateExerciseSchema.parse(req);
      const { name, difficulty, programID } = validationResult.body;

      const exercise = await this.exerciseService.updateExerciseHandler(
        parseInt(id),
        {
          name,
          difficulty,
          programID,
        }
      );

      if (!exercise) {
        throw new ForbiddenError("Exercise not found", ErrorCode.NOT_FOUND);
      }

      res.status(200).json({
        success: true,
        data: exercise,
        message: "Exercise updated successfully",
      });
    } catch (error) {
      throw new InternalServerError(
        "Failed to update exercise: " + (error as Error),
        ErrorCode.INTERNAL_SERVER
      );
    }
  };

  deleteExercise = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const exercise = await this.exerciseService.deleteExerciseHandler(
        parseInt(id)
      );

      if (!exercise) {
        throw new ForbiddenError("Exercise not found", ErrorCode.NOT_FOUND);
      }

      res.status(200).json({
        success: true,
        message: "Exercise deleted successfully",
      });
    } catch (error) {
      throw new InternalServerError(
        "Failed to delete exercise: " + (error as Error),
        ErrorCode.INTERNAL_SERVER
      );
    }
  };
}
