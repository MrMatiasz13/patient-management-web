import { hash } from "bcrypt-ts";
import SequelizeUser from "../models/user";

class UserService {
    async createUser(username: string, email: string, password: string) {
        const existingUser = await SequelizeUser.findOne({where: { email }});
        if(existingUser) throw new Error('User already exist');

        const hashedPassword = await hash(password, 10);
        const newUser = await SequelizeUser.create({
            username: username,
            email: email,
            password: hashedPassword
        });

        return newUser;
    }

    async getUserByEmail(email: string): Promise<SequelizeUser | null> {
        const user = SequelizeUser.findOne({ where: {email} });
        return user || null;
    }
}

export default UserService;