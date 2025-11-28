import { Request, Response } from "express";
import { ProgramService } from "../services/program.service";
import InternalServerError from "../adapters/errors/internalServer.error";
import { ErrorCode } from "../adapters/errors/custom.errors";
import ForbiddenError from "../adapters/errors/forbidden.error";
import {
  addExerciseToProgramSchema,
  createProgramSchema,
} from "../db/schemas/program.schema";

export class ProgramController {
  private programService = new ProgramService();

  findAllPrograms = async (req: Request, res: Response) => {
    try {
      const programs = await this.programService.findAllProgramsHandler();

      res.status(200).json({
        success: true,
        data: programs,
        message: "List of programs",
      });
    } catch (error) {
      throw new InternalServerError(
        "Failed to retrieve programs: " + (error as Error),
        ErrorCode.INTERNAL_SERVER
      );
    }
  };

  findProgramById = async (req: Request, res: Response) => {
    try {
      const program = await this.programService.findProgramByIdHandler(
        Number(req.params.id)
      );

      if (!program) {
        throw new ForbiddenError("Program not found", ErrorCode.NOT_FOUND);
      }

      res.status(200).json({
        success: true,
        data: program,
        message: "Program details",
      });
    } catch (error) {
      throw new InternalServerError(
        "Failed to retrieve program: " + (error as Error),
        ErrorCode.INTERNAL_SERVER
      );
    }
  };

  addExerciseToProgram = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const validationResult = addExerciseToProgramSchema.parse(req);

      const { exerciseId } = validationResult.body;

      console.log("Adding exercise to program:", { programId: id, exerciseId });
      const program = await this.programService.addExerciseToProgramHandler(
        Number(id),
        exerciseId
      );

      res.status(200).json({
        success: true,
        data: program,
        message: "Exercise added to program successfully",
      });
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw error;
      }
      throw new InternalServerError(
        "Failed to add exercise to program: " + (error as Error).message,
        ErrorCode.INTERNAL_SERVER
      );
    }
  };

  removeExerciseFromProgram = async (req: Request, res: Response) => {
    try {
      const { id, exerciseId } = req.params;

      const program =
        await this.programService.removeExerciseFromProgramHandler(
          Number(id),
          Number(exerciseId)
        );

      res.status(200).json({
        success: true,
        data: program,
        message: "Exercise removed from program successfully",
      });
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw error;
      }
      throw new InternalServerError(
        "Failed to remove exercise from program: " + (error as Error).message,
        ErrorCode.INTERNAL_SERVER
      );
    }
  };
}
