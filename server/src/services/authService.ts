import bcrypt from "bcrypt-ts";
import UserService from "./userService";
import jwt from 'jsonwebtoken';
import { SECRET_KEY, TOKEN_EXPIRATION } from "../constants/configConstants";

class AuthService {
    constructor (
        private readonly userService: UserService
    ) {}

    async login(email: string, password: string): Promise<string> {
        const user = await this.userService.getUserByEmail(email);
        if (user == null) throw new Error("Invalid credentials.");

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) throw new Error("Invalid credentials.");

        const secretKey = SECRET_KEY;
        if (!secretKey) throw new Error("SECRET_KEY is undefined");    
        
        const tokenExpiration = TOKEN_EXPIRATION;

        const token = jwt.sign({ id: user.id, name: user.username, email: user.email }, 
            secretKey, 
            { expiresIn: tokenExpiration }
        );

        return token;
    }
}

export default AuthService;