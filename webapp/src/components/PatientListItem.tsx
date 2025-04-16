import { Patient } from "../utils/types/patient";
import { FaUser, FaArrowRight } from "react-icons/fa";

interface PatientListItemProps extends Patient {
  isSelected: boolean;
  onClick: () => void;
}

function PatientListItem({
  isSelected,
  onClick,
  ...patient
}: PatientListItemProps) {
  return (
    <div
      className={`flex mt-2 p-4 bg-white shadow-2xs rounded-2xl cursor-pointer ${
        isSelected ? "border-2 border-blue-500" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex w-full my-4 gap-3">
        <div className="flex h-full items-center">{patientImage(patient)}</div>
        <div className="flex text-lg font-semibold">
          {patient.name} {patient.surename}
        </div>
      </div>
      <button className="flex justify-end mt-auto bg-[#007bff] hover:bg-[#0069d9] text-white px-2 py-2 rounded-xl">
        <FaArrowRight />
      </button>
    </div>
  );
}

const patientImage = (patient: Patient) => {
  if (!patient.imagePath) {
    return <FaUser size={50} color="gray" />;
  }

  return <img src={patient.imagePath} alt="Patient" />;
};

export default PatientListItem;
