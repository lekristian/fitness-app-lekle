import { models } from "../db";
import { ExerciseModel } from "../db/models/exercise";
import ForbiddenError from "../adapters/errors/forbidden.error";
import { ErrorCode } from "../adapters/errors/custom.errors";

export class ProgramService {
  private programRepository = models.Program;
  private exerciseRepository = models.Exercise;

  private async getExerciseOrThrow(
    exerciseId: number,
    currentProgramId: number,
    shouldBelongToProgram: boolean = false
  ): Promise<ExerciseModel> {
    console.log("getExerciseOrThrow called with:", {
      exerciseId,
      currentProgramId,
      shouldBelongToProgram,
    });
    const exercise = await this.exerciseRepository.findOne({
      where: {
        id: exerciseId,
        ...(shouldBelongToProgram && { programID: currentProgramId }),
      },
    });

    if (!exercise && shouldBelongToProgram) {
      throw new ForbiddenError("Exercise not found", ErrorCode.NOT_FOUND);
    }

    if (
      !shouldBelongToProgram &&
      Number(exercise.programID) === currentProgramId
    ) {
      throw new ForbiddenError(
        "Exercise already belongs to this program",
        ErrorCode.FORBIDDEN
      );
    }

    console.log("2");
    return exercise;
  }

  findAllProgramsHandler = async () =>
    await this.programRepository.findAll({
      include: [
        {
          model: models.Exercise,
        },
      ],
    });

  findProgramByIdHandler = async (id: number) =>
    await this.programRepository.findByPk(id, {
      include: [
        {
          model: models.Exercise,
        },
      ],
    });

  addExerciseToProgramHandler = async (
    programId: number,
    exerciseId: number
  ) => {
    const exercise = await this.getExerciseOrThrow(exerciseId, programId);
    await exercise.update({ programID: programId });

    return await this.findProgramByIdHandler(programId);
  };

  removeExerciseFromProgramHandler = async (
    programId: number,
    exerciseId: number
  ) => {
    const exercise = await this.getExerciseOrThrow(exerciseId, programId, true);
    await exercise.destroy();

    return await this.findProgramByIdHandler(programId);
  };
}
