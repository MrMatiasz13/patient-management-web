import { UserDto } from "../dtos/userDto";
import SequelizeUser from "../models/user";

class UserRepository {
  async getUserById(id: number): Promise<SequelizeUser | null> {
    return SequelizeUser.findOne({ where: { id } });
  }

  async getUserByEmail(email: string): Promise<SequelizeUser | null> {
    return SequelizeUser.findOne({ where: { email } });
  }

  async createUser(user: UserDto): Promise<SequelizeUser> {
    return SequelizeUser.create(user);
  }
}

export default UserRepository;
