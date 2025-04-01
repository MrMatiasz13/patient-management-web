import bcrypt from "bcrypt-ts";
import UserService from "./userService";
import jwt from 'jsonwebtoken';
import { SECRET_KEY, TOKEN_EXPIRATION } from "../constants/configConstants";
import RefreshTokenService from "./refreshTokenService";

class AuthService {
    constructor (
        private readonly userService: UserService,
        private readonly refreshTokenService: RefreshTokenService
    ) {}

    async login(email: string, password: string) {
        const user = await this.userService.getUserByEmail(email);
        if (user == null) throw new Error("Invalid credentials.");

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) throw new Error("Invalid credentials.");

        const refreshToken = await this.refreshTokenService.createRefreshToken(user.id!);
        const accessToken = await this.generateAccessToken(user.id!);

        return { refreshToken, accessToken };
    }

    async generateAccessToken(userId: number): Promise<string> {
        if (!SECRET_KEY) throw new Error("SECRET_KEY is undefined");  
        
        return jwt.sign({ id: userId }, 
            SECRET_KEY, 
            { expiresIn: TOKEN_EXPIRATION }
        );
    }
}

export default AuthService;