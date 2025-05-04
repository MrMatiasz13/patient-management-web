  import { IoSearch } from "react-icons/io5";
  import { FaPlus } from "react-icons/fa";
  import PatientListItem from "./PatientListItem";
  import { useEffect, useRef, useState } from "react";
  import AddPatientDialog, { AddPatientDialogRef } from "./AddPatientDialog";
  import { usePatient } from "../../hooks/usePatient";
  import { Patient } from "../../utils/types/patient";

  function PatientList() {
    const dialogRef = useRef<AddPatientDialogRef>(null);
    const { getAllPatients, deletePatient, patients } = usePatient();

    const [search, setSearch] = useState("");
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

    useEffect(() => {
      getAllPatients();
    }, []);

    const openAddPatientDialog = () => {
      if (!dialogRef.current) {
        return;
      }
      dialogRef.current.open();
    };

    const handleEdit = async () => {};

    const handleDelete = async (patient: Patient) => {
      await deletePatient(patient);
      await getAllPatients();
    };

    return (
      <div className="w-1/3 bg-white border-r-1 border-gray-400 overflow-y-auto">
        <h2 className="m-4 font-bold text-3xl">Pacjenci</h2>
        <div className="m-4 relative">
          <input
            className="w-full pl-10 pr-4 py-2 text-xl border-2 border-gray-400 rounded-md placeholder:text-xl focus:outline-none focus:ring-3 focus:ring-blue-500 focus:border-transparent"
            type="text"
            placeholder="Wyszukaj pacjenta..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <IoSearch className="absolute left-3 top-2.5 text-gray-400" size={25} />
        </div>
        <div className="mx-4 my-4">
          <button
            className="flex w-full py-3 gap-2 items-center justify-center text-xl text-white font-bold rounded-md bg-[#007bff] hover:bg-[#0069d9] cursor-pointer"
            onClick={openAddPatientDialog}
          >
            <FaPlus />
            <span>Dodaj Pacjenta</span>
          </button>
        </div>
        <div className="mt-6">
          {patients.map((patient) => (
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

        <AddPatientDialog ref={dialogRef} onPatientAdded={getAllPatients} />
      </div>
    );
  }

  export default PatientList;
