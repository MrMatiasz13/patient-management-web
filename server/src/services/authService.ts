import bcrypt from "bcrypt-ts";
import UserService from "./userService";
import jwt from 'jsonwebtoken';
import RefreshTokenService from "./refreshTokenService";
import { SECRET_KEY, TOKEN_EXPIRATION } from "../constants/configConstants";

class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly refreshTokenService: RefreshTokenService
    ) {}

    async login(email: string, password: string) {
        const user = await this.userService.getUserByEmail(email);
        if (user == null) throw new Error("Invalid credentials.");

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) throw new Error("Invalid credentials.");

        const refreshToken = await this.refreshTokenService.createRefreshToken(user.id!);
        const accessToken = await this.generateAccessToken(refreshToken);

        return { refreshToken, accessToken };
    }

    async generateAccessToken(refreshToken: string): Promise<string> {
        if (!SECRET_KEY) throw new Error("SECRET_KEY is undefined");

        const decodedToken = await this.refreshTokenService.verifyRefreshToken(refreshToken);
        if (!decodedToken || !decodedToken.userId) {
            throw new Error("Invalid or expired token.");
        }

        return jwt.sign({ userId: decodedToken.userId },
            SECRET_KEY,
            { expiresIn: TOKEN_EXPIRATION }
        );
    }
}

export default AuthService;