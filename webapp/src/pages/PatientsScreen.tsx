import PatientListItem from "../components/PatientListItem";
import TopBar from "../components/TopBar";
import { usePatient } from "../hooks/usePatient";
import { Patient } from "../utils/types/patient";
import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";

const patients: Patient[] = [
  {
    id: 1,
    name: "Maciek",
    surename: "Nowak",
    phoneNumber: 608992664,
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
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const { getAllPatients } = usePatient();

  useEffect(() => {
    getAllPatients();
  });

  const handleClick = () => {
    getAllPatients();
  };

  return (
    <div className="flex flex-col h-screen">
      <TopBar />
      <div className="flex flex-1 bg-gray-100">
        <div className="flex flex-col w-[20%] m-4">
          <div className="flex w-full items-center justify-between">
            <span className="mx-2 text-2xl font-bold">Lista Pacjentów</span>
            <button
              className="flex items-center bg-[#007bff] hover:bg-[#0069d9] text-white font-bold px-2 py-2 border rounded-2xl"
              onClick={handleClick}
            >
              <IoMdAdd size={20} /> Dodaj
            </button>
          </div>

          <div className="flex flex-col w-full h-full rounded-2xl">
            {patients.map((patient) => (
              <PatientListItem
                key={patient.id}
                {...patient}
                isSelected={selectedPatient?.id === patient.id}
                onClick={() => setSelectedPatient(patient)}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-1 bg-white shadow-2xl gap-2 my-2 mr-4 ml-2 p-5 rounded-2xl">
          <div className="flex flex-col w-2/5">Dane</div>

          <div className="flex w-3/5">Notatki</div>
        </div>
      </div>
    </div>
  );
}

export default PatientsScreen;
