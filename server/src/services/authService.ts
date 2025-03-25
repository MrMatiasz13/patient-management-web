import UserService from "./userService";

class AuthService {
    private userService: UserService;

    constructor (userService: UserService) {
        this.userService = userService;
    }

    async login(email: string, password: string) {}
}

export default AuthService;