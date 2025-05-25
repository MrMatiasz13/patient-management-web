import AuthService from "./services/authService";
import PatientService from "./services/patientService";
import RefreshTokenService from "./services/refreshTokenService";
import UserService from "./services/userService";

// services
const userService = new UserService();
const patientService = new PatientService();
const refreshTokenService = new RefreshTokenService();
const authService = new AuthService(userService, refreshTokenService);

export { userService, authService, patientService, refreshTokenService };
