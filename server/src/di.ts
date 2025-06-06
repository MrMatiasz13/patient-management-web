import UserRepository from "./repositories/userRepository";
import AuthService from "./services/authService";
import PatientService from "./services/patientService";
import RefreshTokenService from "./services/refreshTokenService";
import UserService from "./services/userService";

// repositories
const userRepository = new UserRepository();

// services
const userService = new UserService(userRepository);
const patientService = new PatientService();
const refreshTokenService = new RefreshTokenService();
const authService = new AuthService(userService, refreshTokenService);

export { userService, authService, patientService, refreshTokenService };
