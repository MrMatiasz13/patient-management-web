import { useState } from "react";
import PatientService from "../services/patientService";
import axiosClient from "../api/axiosClient";

const patientsService = new PatientService(axiosClient);

export function usePatient() {
    const [patients, setPatients] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getAllPatients = async () => {
        await patientsService.getAllPatients();
    }

    return { getAllPatients };
}