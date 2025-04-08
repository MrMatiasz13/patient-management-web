import { useState } from "react";
import AuthService from "../services/authService";
import axiosClient from "../api/axiosClient";
import { AxiosError } from "axios";
import { User } from "../utils/types/user";

const authService = new AuthService(axiosClient);

function useAuth() {
    const [user, setUser] = useState<User>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const login = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const data = await authService.login(email, password);
            const user: User = {
                id: data.user.id,
                username: data.user.name,
                email: data.user.email
            }
            setUser(user);
        } catch(err) {
            if (err instanceof AxiosError) {
                setError(err.message);
                console.log(err.message);
            } else {
                setError("Unexpected error occured.");
            }
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