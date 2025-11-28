import { ErrorCode } from "../adapters/errors/custom.errors";
import { ForbiddenError } from "../adapters/errors/index.error";
import { models } from "../db";
import { CreateExerciseDto, UpdateExerciseDto } from "../db/models/exercise";
import program from "../db/models/program";

export class ExerciseService {
  private exerciseRepository = models.Exercise;
  private programRepository = models.Program;

  findAllExercises = async () =>
    await this.exerciseRepository.findAll({
      include: [
        {
          model: models.Program,
        },
      ],
    });

  createExercise = async (data: CreateExerciseDto) => {
    // Validate that program exists
    const program = await this.programRepository.findByPk(data.programID);
    if (!program) {
      this.throwProgramNotFoundIfNull(data.programID);
    }

    return await this.exerciseRepository.create(data as any);
  };

  updateExercise = async (id: number, data: UpdateExerciseDto) => {
    const exercise = await this.exerciseRepository.findByPk(id);
    if (!exercise) {
      return null;
    }

    // Validate program if it's being updated
    if (data.programID) {
      const program = await this.programRepository.findByPk(data.programID);
      if (!program) {
        this.throwProgramNotFoundIfNull(data.programID);
      }
    }

    await exercise.update(data);
    return exercise;
  };

  deleteExercise = async (id: number) => {
    const exercise = await this.exerciseRepository.findByPk(id);
    if (!exercise) {
      return false;
    }
    await exercise.destroy();
    return true;
  };

  throwProgramNotFoundIfNull = (programId: number) => {
    throw new ForbiddenError(
      `Program: ${programId} not found`,
      ErrorCode.NOT_FOUND
    );
  };
}
