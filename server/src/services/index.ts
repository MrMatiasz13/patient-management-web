import AuthService from "./authService";
import PatientService from "./patientService";
import UserService from "./userService";

const userService = new UserService();
const authService = new AuthService(userService);
const patientService = new PatientService();

export { userService, authService, patientService };