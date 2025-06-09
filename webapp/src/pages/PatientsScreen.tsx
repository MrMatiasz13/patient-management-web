import { useState } from "react";
import PatientInfoPanel from "../components/patient-info-panel/PatientInfoPanel";
import PatientList from "../components/patient-list/PatientList";
import { Patient } from "../utils/types/models/patient";

function PatientsScreen() {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  return (
    <div className="flex w-full h-screen">
      <PatientList
        selectedPatient={selectedPatient}
        setSelectedPatient={setSelectedPatient}
      />
      <PatientInfoPanel selectedPatient={selectedPatient} />
    </div>
  );
}

export default PatientsScreen;
