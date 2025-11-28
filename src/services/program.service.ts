import { models } from "../db";

export class ProgramService {
  private programRepository = models.Program;

  findAllPrograms = async () =>
    await this.programRepository.findAll({
      include: [
        {
          model: models.Exercise,
        },
      ],
    });

  findProgramById = async (id: number) =>
    await this.programRepository.findByPk(id, {
      include: [
        {
          model: models.Exercise,
        },
      ],
    });
}
