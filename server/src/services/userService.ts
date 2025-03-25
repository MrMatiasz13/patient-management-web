import { hash } from "bcrypt-ts";
import User from "../models/user";

class UserService {
    async createUser(username: string, email: string, password: string) {
        const existingUser = await User.findOne({where: { email }});
        if(existingUser) throw new Error('User already exist');

        const hashedPassword = await hash(password, 10);
        const newUser = await User.create({
            username: username,
            email: email,
            password: hashedPassword
        });

        return newUser;
    }
}

export default UserService;