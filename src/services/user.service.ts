import { models } from "../db";
import {
  USER_SAFE_ATTRIBUTES,
  UserCreationAttributes,
} from "../db/models/user";

export class UserService {
  private userRepository = models.User;

  findAllUsersHandler = async () =>
    await this.userRepository.findAll({
      attributes: USER_SAFE_ATTRIBUTES,
    });

  findUserByIdHandler = async (id?: number) =>
    await this.userRepository.findOne({
      where: { id },
      attributes: USER_SAFE_ATTRIBUTES,
    });

  findUserByEmailHandler = async (email: string, safe: boolean = true) =>
    await this.userRepository.findOne({
      where: { email },
      attributes: safe ? USER_SAFE_ATTRIBUTES : undefined,
    });

  createUserHandler = async (userData: UserCreationAttributes) => {
    const newUser = await this.userRepository.create(userData);
    return newUser;
  };

  updateUserHandler = async (
    id: number,
    updateData: Partial<UserCreationAttributes>
  ) => {
    const user = await this.userRepository.findByPk(id);
    if (!user) {
      return null;
    }
    await user.update(updateData);
    return user;
  };
}
