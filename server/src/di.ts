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
const userService = new UserService(userRepository);
const patientService = new PatientService(patientRepository);
const refreshTokenService = new RefreshTokenService(refreshTokenRepository);
const authService = new AuthService(userService, refreshTokenService);
const screeningTestService = new ScreeningTestService(screeningTestRepository);

export {
  userService,
  authService,
  patientService,
  refreshTokenService,
  screeningTestService,
};
