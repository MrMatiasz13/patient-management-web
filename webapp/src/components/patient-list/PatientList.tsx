import { IoSearch } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import PatientListItem from "./PatientListItem";
import { useEffect, useRef, useState } from "react";
import AddPatientDialog, { AddPatientDialogRef } from "./AddPatientDialog";
import { usePatient } from "../../hooks/usePatient";
import { Patient } from "../../utils/types/models/patient";
import { ClipLoader } from "react-spinners";

interface PatientListProps {
  selectedPatient: Patient | null;
  setSelectedPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
}

function PatientList({
  selectedPatient,
  setSelectedPatient,
}: PatientListProps) {
  const { getAllPatients, deletePatient, patients } = usePatient();
  const [search, setSearch] = useState("");

  const dialogRef = useRef<AddPatientDialogRef>(null);

  useEffect(() => {
    getAllPatients();
  }, []);

  const openAddPatientDialog = () => {
    if (!dialogRef.current) {
      return;
    }
    dialogRef.current.open();
  };

  if (!patients) return <ClipLoader></ClipLoader>;

  const handleSearch = (patient: Patient) => {
    return search.toLowerCase() === ""
      ? patient
      : patient.name.toLowerCase().includes(search) ||
          patient.name.includes(search);
  };

  const handleEdit = async () => {};

  const handleDelete = async (patient: Patient) => {
    await deletePatient(patient);
    await getAllPatients();
  };

  return (
    <div className="bg-white">
      <h2 className="px-4 py-1 font-bold text-3xl">Pacjenci</h2>
      <div className="m-4 relative">
        <input
          className="w-full pl-10 pr-4 py-2 text-xl border-1 border-gray-400 rounded-md placeholder:text-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          type="text"
          placeholder="Wyszukaj pacjenta..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <IoSearch className="absolute left-3 top-2.5 text-gray-400" size={25} />
      </div>
      <div className="mx-4 my-4">
        <button
          className="flex w-full py-3 gap-2 items-center justify-center text-xl
           text-white font-bold rounded-md bg-[#007bff] hover:bg-[#0069d9] cursor-pointer"
          onClick={openAddPatientDialog}
        >
          <FaPlus />
          <span>Dodaj Pacjenta</span>
        </button>
      </div>
      <div className="mt-6">
        {patients
          .filter((patient) => {
            return handleSearch(patient);
          })
          .map((patient) => (
            <PatientListItem
              key={patient.id}
              {...patient}
              isSelected={selectedPatient?.id === patient.id}
              onClick={() => setSelectedPatient(patient)}
              onEdit={handleEdit}
              onDelete={async () => {
                await handleDelete(patient);
              }}
            />
          ))}
      </div>
      <AddPatientDialog ref={dialogRef} onPatientAdded={getAllPatients} />{" "}
    </div>
  );
}

export default PatientList;
