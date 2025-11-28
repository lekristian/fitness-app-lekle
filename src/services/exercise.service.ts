import { models } from "../db";

export class ExerciseService {
  private exerciseRepository = models.Exercise;

  findAllExercises = async () =>
    await this.exerciseRepository.findAll({
      include: [
        {
          model: models.Program,
        },
      ],
    });
}
