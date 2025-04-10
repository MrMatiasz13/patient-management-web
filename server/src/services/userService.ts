import { hash } from "bcrypt-ts";
import SequelizeUser from "../models/user";

class UserService {
    async createUser(name: string, surename: string, email: string, password: string) {
        const user = await this.getUserByEmail(email);
        if(user != null) throw new Error('User already exist');

        const hashedPassword = await hash(password, 10);
        const newUser = await SequelizeUser.create({
            name: name,
            surename: surename,
            email: email,
            password: hashedPassword
        });

        return newUser;
    }

    async getUserById(userId: number): Promise<SequelizeUser | null> {
        const user = SequelizeUser.findOne({ where: { id: userId } });
        return user || null;
    }

    async getUserByEmail(email: string): Promise<SequelizeUser | null> {
        const user = SequelizeUser.findOne({ where: {email} });
        return user || null;
    }
}

export default UserService;