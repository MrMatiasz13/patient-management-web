import PatientListItem from "../components/PatientListItem";
import TopBar from "../components/TopBar";
import { Patient } from "../utils/types/patient";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";

const patients: Patient[] = [
  {
    id: 1,
    name: "Maciek",
    surename: "Nowak",
  },
  {
    id: 2,
    name: "Rysiek",
    surename: "Pasternak",
  },
  {
    id: 3,
    name: "Piotr",
    surename: "Grześków",
  },
];

function PatientsScreen() {
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(
    null
  );

  return (
    <div className="flex flex-col h-screen">
      <TopBar />
      <div className="flex flex-1 bg-gray-100">
        <div className="flex flex-col w-[20%] m-4">
          <div className="flex w-full items-center justify-between">
            <span className="mx-2 text-2xl font-bold">Lista Pacjętów</span>
            <button className="flex items-center bg-[#007bff] hover:bg-[#0069d9] text-white font-bold px-2 py-2 border rounded-2xl">
              <IoMdAdd size={20} /> Dodaj
            </button>
          </div>

          <div className="flex flex-col w-full h-full rounded-2xl">
            {patients.map((patient) => (
              <PatientListItem
                key={patient.id}
                {...patient}
                isSelected={selectedPatientId === patient.id}
                onClick={() => setSelectedPatientId(patient.id)}
              />
            ))}
          </div>
        </div>

        <div className="flex w-full bg-white shadow-2xl my-4 mr-4 ml-2 rounded-2xl">
          Patient Data
        </div>
      </div>
    </div>
  );
}

export default PatientsScreen;
