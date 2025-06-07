import ExaminationRepository from "./repositories/examinationRepository";
import RefreshTokenRepository from "./repositories/refreshTokenRepository";
import UserRepository from "./repositories/userRepository";
import AuthService from "./services/authService";
import PatientService from "./services/patientService";
import RefreshTokenService from "./services/refreshTokenService";
import UserService from "./services/userService";

// repositories
const userRepository = new UserRepository();
const refreshTokenRepository = new RefreshTokenRepository();
const examiantionRepository = new ExaminationRepository();

// services
const userService = new UserService(userRepository);
const patientService = new PatientService();
const refreshTokenService = new RefreshTokenService(refreshTokenRepository);
const authService = new AuthService(userService, refreshTokenService);

export { userService, authService, patientService, refreshTokenService };
