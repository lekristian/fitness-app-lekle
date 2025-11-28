import { Request, Response } from "express";
import { ExerciseService } from "../services/exercise.service";

export class ExerciseController {
  private exerciseService = new ExerciseService();

  findAllExercises = async (req: Request, res: Response) => {
    try {
      const exercises = await this.exerciseService.findAllExercises();

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
}
