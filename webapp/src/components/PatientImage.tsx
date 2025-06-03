import { FaUser } from "react-icons/fa";
import { Patient } from "../utils/types/patient";

interface PatientImageProps {
  patient: Patient;
  iconSize?: number;
}

function PatientImage({ patient, iconSize }: PatientImageProps) {
  if (!patient.imagePath) {
    return <FaUser className="text-gray-500" size={iconSize ? iconSize : 50} />;
  }

  return <img src={patient.imagePath} alt="Patient" />;
}

export default PatientImage;
