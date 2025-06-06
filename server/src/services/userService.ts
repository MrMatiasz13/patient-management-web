import { hash } from "bcrypt-ts";
import SequelizeUser from "../models/user";
import UserRepository from "../repositories/userRepository";
import { UserDto } from "../dtos/userDto";

class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(data: UserDto) {
    const user = await this.userRepository.getUserByEmail(data.email);
    if (user != null) throw new Error("User already exist");

    const hashedPassword = await hash(data.password, 10);
    const newUser = await this.userRepository.createUser({
      ...data,
      password: hashedPassword,
    });

    return newUser;
  }

  async getUserById(userId: number): Promise<SequelizeUser | null> {
    return await this.userRepository.getUserById(userId);
  }

  async getUserByEmail(email: string): Promise<SequelizeUser | null> {
    return await this.userRepository.getUserByEmail(email);
  }
}

export default UserService;
