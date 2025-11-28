import { models } from "../db";
import {
  USER_SAFE_ATTRIBUTES,
  UserCreationAttributes,
} from "../db/models/user";

export class UserService {
  private userRepository = models.User;

  findUserById = async (id?: number) =>
    await this.userRepository.findOne({
      where: { id },
      attributes: USER_SAFE_ATTRIBUTES,
    });

  findUserByEmail = async (email: string, safe: boolean = true) =>
    await this.userRepository.findOne({
      where: { email },
      attributes: safe ? USER_SAFE_ATTRIBUTES : undefined,
    });

  createUser = async (userData: UserCreationAttributes) => {
    const newUser = await this.userRepository.create(userData);
    return newUser;
  };
}
