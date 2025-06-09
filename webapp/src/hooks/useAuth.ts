import { useState } from "react";
import AuthService from "../services/authService";
import axiosClient from "../api/axiosClient";
import { AxiosError } from "axios";
import { User } from "../utils/types/models/user";
import { useUser } from "./useUser";

const authService = new AuthService(axiosClient);

export function useAuth() {
  const { setUser, setToken } = useUser();
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
      setToken(data.token);
      setUser(user);

      localStorage.setItem("userId", JSON.stringify(user.id));
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
      const userId = Number(localStorage.getItem("userId"));
      await authService.logout(userId);

      localStorage.removeItem("userId");
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

  const refreshToken = async (userId: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authService.refreshToken(userId);
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
