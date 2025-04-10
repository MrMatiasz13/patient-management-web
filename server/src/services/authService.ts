import bcrypt from "bcrypt-ts";
import UserService from "./userService";
import jwt from 'jsonwebtoken';
import RefreshTokenService from "./refreshTokenService";
import { SECRET_KEY, TOKEN_EXPIRATION } from "../constants/configConstants";
import { AuthError } from "../utils/errors/authError";
import SequelizeUser from "../models/user";

class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly refreshTokenService: RefreshTokenService
    ) {}

    async login(email: string, password: string) {
        const user = await this.userService.getUserByEmail(email);
        if (user == null) throw new AuthError("Invalid credentials.");

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) throw new AuthError("Invalid credentials.");

        await this.refreshTokenService.createRefreshToken(user.id!);
        const accessToken = await this.generateAccessToken(user.id!);

        return { user, accessToken };
    }

    async generateAccessToken(userId: number) {
        if (!SECRET_KEY) throw new Error("SECRET_KEY is undefined");

        const refreshToken = await this.refreshTokenService.getRefreshToken(userId);

        const decodedToken = await this.refreshTokenService.verifyRefreshToken(refreshToken);
        if (!decodedToken || !decodedToken.userId) throw new Error("Invalid or expired token.");

        const user = await this.userService.getUserById(userId);
        if (!user) throw new Error("User not found");

        const token = jwt.sign({ userId: decodedToken.userId },
            SECRET_KEY,
            { expiresIn: TOKEN_EXPIRATION }
        );

        return { token, user };
    }
}

export default AuthService;