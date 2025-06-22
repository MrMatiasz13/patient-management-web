import { useState } from "react";
import axiosClient from "../api/axiosClient";
import ScreeningTestService from "../services/screeningTestService";
import { ScreeningTest } from "../utils/types/models/screeningTest";
import { CreateScreeningTestDto } from "../utils/types/models/dtos/createScreeningTestDto";

const screeningTestService = new ScreeningTestService(axiosClient);

export function useScreeningTest() {
  const [screeningTests, setScreeningTests] = useState<ScreeningTest[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getAllScreeningTests = async (patientId: number) => {
    setLoading(true);
    setError(null);
    try {
      const tests =
        await screeningTestService.getAllScreeningTestForPatient(patientId);
      setScreeningTests(tests);
    } catch (error) {
      console.error(error);
      setError(`error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const getScreeningTestById = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      return await screeningTestService.getScreeningTestById(id);
    } catch (error) {
      console.error(error);
      setError(`error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const createScreeningTest = async (screeningTest: CreateScreeningTestDto) => {
    setLoading(true);
    setError(null);
    try {
      await screeningTestService.createScreeningTest(screeningTest);
    } catch (error) {
      console.error(error);
      setError(`error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    screeningTests,
    loading,
    error,
    getAllScreeningTests,
    getScreeningTestById,
    createScreeningTest,
  };
}
