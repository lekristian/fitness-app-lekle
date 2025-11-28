import { Request, Response } from "express";
import { ProgramService } from "../services/program.service";
import InternalServerError from "../adapters/errors/internalServer.error";
import { ErrorCode } from "../adapters/errors/custom.errors";
import ForbiddenError from "../adapters/errors/forbidden.error";

export class ProgramController {
  private programService = new ProgramService();

  findAllPrograms = async (req: Request, res: Response) => {
    try {
      const programs = await this.programService.findAllPrograms();

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
      const program = await this.programService.findProgramById(
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
}
