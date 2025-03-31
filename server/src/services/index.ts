import AuthService from "./authService";
import PatientService from "./patientService";
import RefreshTokenService from "./refreshTokenService";
import UserService from "./userService";

const userService = new UserService();
const authService = new AuthService(userService);
const patientService = new PatientService();
const refreshTokenService = new RefreshTokenService();

export { 
    userService, 
    authService, 
    patientService, 
    refreshTokenService 
};