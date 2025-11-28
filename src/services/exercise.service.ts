import { ErrorCode } from "../adapters/errors/custom.errors";
import { ForbiddenError } from "../adapters/errors/index.error";
import { models } from "../db";
import { CreateExerciseDto, UpdateExerciseDto } from "../db/models/exercise";

export class ExerciseService {
  private exerciseRepository = models.Exercise;
  private programRepository = models.Program;

  private throwProgramNotFoundIfNull(programID: number) {
    throw new ForbiddenError(
      `Program: ${programID} not found`,
      ErrorCode.NOT_FOUND
    );
  }

  // As one exercise can belong to only one program, we need to check for name uniqueness within that program
  // because two different programs can have exercises with the same name,
  // but not within the same program.
  private async validateProgramAndUniqueness(
    programId: number,
    exerciseName: string,
    excludeExerciseId?: number
  ) {
    const program = await this.programRepository.findByPk(programId, {
      include: [
        {
          model: models.Exercise,
        },
      ],
    });

    if (!program) {
      this.throwProgramNotFoundIfNull(programId);
    }

    const duplicateExercise = program.exercises.find(
      (exercise) =>
        exercise.name === exerciseName &&
        (!excludeExerciseId || exercise.id !== excludeExerciseId)
    );

    if (duplicateExercise) {
      throw new ForbiddenError(
        `Exercise with name "${exerciseName}" already exists in this program`,
        ErrorCode.FORBIDDEN
      );
    }
  }

  findAllExercisesHandler = async () =>
    await this.exerciseRepository.findAll({
      include: [
        {
          model: models.Program,
        },
      ],
    });

  createExerciseHandler = async (data: CreateExerciseDto) => {
    await this.validateProgramAndUniqueness(data.programID, data.name);

    return await this.exerciseRepository.create(data as any);
  };

  updateExerciseHandler = async (id: number, data: UpdateExerciseDto) => {
    const exercise = await this.exerciseRepository.findByPk(id);
    if (!exercise) {
      return null;
    }

    if (data.programID) {
      const program = await this.programRepository.findByPk(data.programID);
      if (!program) {
        this.throwProgramNotFoundIfNull(data.programID);
      }
    }

    await exercise.update(data);
    return exercise;
  };

  deleteExerciseHandler = async (id: number) => {
    const exercise = await this.exerciseRepository.findByPk(id);
    if (!exercise) {
      return false;
    }
    await exercise.destroy();
    return true;
  };
}
