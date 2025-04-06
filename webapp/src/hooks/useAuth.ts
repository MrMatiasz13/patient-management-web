import { useState } from "react";
import { User } from "../utils/types/user";
import AuthService from "../services/authService";
import { AxiosError, AxiosInstance } from "axios";

function useAuth(axiosClient: AxiosInstance) {
    const [user, setUser] = useState<User | null>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const authService = new AuthService(axiosClient);

    const login = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const data = await authService.login(email, password) as User;
            if (data) setUser(data);

            console.log(data);
        } catch (err) {
            if (err instanceof AxiosError) {
                setError(err.response?.data?.message || err.message);
                return;
            }

            setError("Unexpected error occurred");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return {
        user,
        loading,
        error,
        login,
    };
}

export default useAuth;