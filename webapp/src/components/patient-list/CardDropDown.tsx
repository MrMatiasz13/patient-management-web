import { RefObject } from "react";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";

interface CardDropDownProps {
  ref: RefObject<HTMLDivElement | null>;
  onEdit: () => void;
  onDelete: () => void;
}

function CardDropDown({ ref, onEdit, onDelete }: CardDropDownProps) {
  return (
    <div
      className="absolute right-0 -top-2 bg-white shadow-lg ring-1 ring-gray-200 rounded-md z-10"
      ref={ref}
    >
      <div className="py-1">
        <button
          className="flex items-center w-full gap-2 px-4 py-2 font-medium text-sm text-left text-gray-700 hover:bg-gray-100"
          onClick={onEdit}
        >
          <FaRegEdit size={25} />
          <span className="whitespace-nowrap">Edytuj Pacjenta</span>
        </button>
        <button
          className="flex items-center w-full gap-2 px-4 py-2 font-medium text-sm text-left text-red-600 hover:bg-gray-100"
          onClick={onDelete}
        >
          <FaRegTrashCan size={25} />
          <span className="whitespace-nowrap">Usuń Pacjenta</span>
        </button>
      </div>
    </div>
  );
}

export default CardDropDown;
