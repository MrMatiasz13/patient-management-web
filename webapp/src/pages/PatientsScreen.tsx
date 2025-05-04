import PatientList from "../components/patient-list/PatientList";

function PatientsScreen() {
  return (
    <div className="flex w-full h-screen gap-2">
      <PatientList />
    </div>
  );
}

export default PatientsScreen;
