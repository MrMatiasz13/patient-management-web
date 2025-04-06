import { AxiosError, AxiosInstance } from "axios";

class AuthService {
    private axiosClinet: AxiosInstance;

    constructor(axiosClient: AxiosInstance) {
        this.axiosClinet = axiosClient;
    }

    async login(email: string, password: string) {
        try {
            const data = { email: email, password: password };

            const response = await this.axiosClinet.post('/auth/login', data);
            return response.data;
        } catch (err) {
            if (err instanceof AxiosError) {
                console.error('Login error:', err.response?.data || err.message);
                return new AxiosError(err.response?.data || err.message);
            }
            
            console.error('Unexpected error:', err);
            return null;
        }
    }

    async logout() {
        // TODO: logout logic
    }

    async refreshToken() {
        // TODO: access token refreshing
    }
}

export default AuthService;