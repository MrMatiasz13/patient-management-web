import AuthService from "./authService";
import PatientService from "./patientService";
import RefreshTokenService from "./refreshTokenService";
import UserService from "./userService";

const userService = new UserService();
const patientService = new PatientService();
const refreshTokenService = new RefreshTokenService();
const authService = new AuthService(userService, refreshTokenService);

export { 
    userService, 
    authService, 
    patientService, 
    refreshTokenService 
};