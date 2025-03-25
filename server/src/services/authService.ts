import bcrypt from "bcrypt-ts";
import UserService from "./userService";

class AuthService {
    constructor (
        private readonly userService: UserService
    ) {}

    async login(email: string, password: string) {
        const user = await this.userService.getUserByEmail(email);
        if (user == null) throw new Error("Invalid credentials.");

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (isPasswordMatch) {
            console.log("Login successful.");
            return { success: true, message: "Login successful" };
        } else {
            throw new Error("Invalid credentials.");
        }
    }
}

export default AuthService;