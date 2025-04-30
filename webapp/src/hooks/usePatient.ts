import { useState } from "react";
import PatientService from "../services/patientService";
import axiosClient from "../api/axiosClient";
import { Patient } from "../utils/types/patient";
import { AxiosError } from "axios";

const patientsService = new PatientService(axiosClient);

export function usePatient() {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getAllPatients = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await patientsService.getAllPatients();
            setPatients(response.patients);
        } catch (err) {
            if (err instanceof AxiosError) {
                setError(err.message);
                console.log(err.message);
            } else {
                console.log(err);
                setError("Unexpected error occured.");
            }
        } finally {
            setLoading(false);
        }
    }

    const addPatient = async (patient: Patient) => {
        setLoading(true);
        setError(null);
        try {
            await patientsService.addPatient(patient);
        } catch (err) {
            if (err instanceof AxiosError) {
                setError(err.message);
                console.log(err.message);
            } else {
                console.log(err);
                setError("Unexpected error occured.");
            }
        } finally {
            setLoading(false);
        }
    };

    return { 
        getAllPatients,
        addPatient, 
        patients, 
        loading, 
        error 
    };
}