import { useState } from "react";
import PatientInfoPanel from "../components/patient-info-panel/PatientInfoPanel";
import PatientList from "../components/patient-list/PatientList";
import { Patient } from "../utils/types/models/patient";
import { UserOption } from "../components/patient-list/UserOption";

function PatientsScreen() {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  return (
    <div className="flex w-full h-screen">
      <div className="flex flex-col w-1/3 border-r-1 border-gray-400 overflow-y-auto">
        <UserOption />
        <PatientList
          selectedPatient={selectedPatient}
          setSelectedPatient={setSelectedPatient}
        />
      </div>
      <PatientInfoPanel selectedPatient={selectedPatient} />
    </div>
  );
}

export default PatientsScreen;
