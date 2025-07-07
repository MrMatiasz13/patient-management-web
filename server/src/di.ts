import PatientRepository from "./repositories/patientRepository";
import RefreshTokenRepository from "./repositories/refreshTokenRepository";
import ScreeningTestRepository from "./repositories/screeningTestRepository";
import UserRepository from "./repositories/userRepository";
import AuthService from "./services/authService";
import PatientService from "./services/patientService";
import RefreshTokenService from "./services/refreshTokenService";
import ScreeningTestService from "./services/screeningTestService";
import UserService from "./services/userService";

// repositories
const userRepository = new UserRepository();
const patientRepository = new PatientRepository();
const refreshTokenRepository = new RefreshTokenRepository();
const screeningTestRepository = new ScreeningTestRepository();

// services
const screeningTestService = new ScreeningTestService(screeningTestRepository);
const userService = new UserService(userRepository);
const patientService = new PatientService(
  patientRepository,
  screeningTestService
);
const refreshTokenService = new RefreshTokenService(refreshTokenRepository);
const authService = new AuthService(userService, refreshTokenService);

export {
  userService,
  authService,
  patientService,
  refreshTokenService,
  screeningTestService,
};
