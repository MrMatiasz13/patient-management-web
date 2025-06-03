import { Patient } from "../../utils/types/patient";
import { MdMoreHoriz } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import CardDropDown from "./CardDropDown";
import { calculateAge } from "../../utils/helpers/CalculateAge";
import PatientImage from "../PatientImage";

interface PatientListItemProps extends Patient {
  isSelected: boolean;
  onClick: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

function PatientListItem({
  isSelected,
  onClick,
  onEdit,
  onDelete,
  ...patient
}: PatientListItemProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const age = calculateAge(patient.birthDate);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div
      className={`relative px-4 py-6 border-t-1 border-y-gray-400 cursor-pointer ${isSelected ? "bg-blue-50 border-l-4 border-blue-600" : "hover:bg-gray-50"}`}
      onClick={onClick}
    >
      <div className="absolute top-3 right-3 text-gray-500 hover:text-black">
        <button className="cursor-pointer" onClick={toggleMenu}>
          <MdMoreHoriz size={30} />
        </button>

        <div className="relative">
          {isMenuOpen && (
            <CardDropDown ref={menuRef} onEdit={onEdit} onDelete={onDelete} />
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <PatientImage patient={patient} />
        <div>
          <h2 className="font-semibold text-2xl">
            {patient.name} {patient.surname}
          </h2>
          <p className="text-gray-500 text-md">
            <span>{age} lat</span>
            {patient.phoneNumber && (
              <>
                <span className="mx-1 text-gray-300">•</span>
                <span>Kontakt: {patient.phoneNumber}</span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PatientListItem;
