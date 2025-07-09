import { useState } from "react";
import AuthService from "../services/authService";
import axiosClient from "../api/axiosClient";
import { AxiosError } from "axios";
import { User } from "../utils/types/models/user";
import { useUser } from "./useUser";

const authService = new AuthService(axiosClient);

export function useAuth() {
  const { user, setUser, setToken } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authService.login(email, password);
      const user: User = {
        id: data.user.id,
        name: data.user.name,
        surename: data.user.surename,
        email: data.user.email,
      };
      setUser(user);
      setToken(data.token);
    } catch (err) {
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

  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      await authService.logout(user!.id);

      setToken(null);
    } catch (err) {
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

  const refreshToken = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await authService.refreshToken();
      const user: User = {
        id: data.user.id,
        name: data.user.name,
        surename: data.user.surename,
        email: data.user.email,
      };

      setToken(data.token);
      setUser(user);
    } catch (err) {
      console.log(err);
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    login,
    logout,
    refreshToken,
  };
}
