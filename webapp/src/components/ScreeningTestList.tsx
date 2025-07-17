import { FaRegTrashCan } from "react-icons/fa6";
import { Patient } from "../utils/types/models/patient";
import { ScreeningTest } from "../utils/types/models/screeningTest";
import { useNavigate } from "react-router";

interface ScreeningTestListProps {
  tests: ScreeningTest[];
  patientId: Patient["id"];
  onDelete: (id: number) => {};
}

export function ScreeningTestList({
  tests,
  patientId,
  onDelete,
}: ScreeningTestListProps) {
  const navigate = useNavigate();

  const handleDelete = async (id: number) => {
    const isConfirm = window.confirm("Czy na pewno chcesz usunąć test?");
    if (isConfirm) onDelete(id);
  };

  return (
    <div className="flex flex-1 flex-col items-center bg-white p-4 mt-2 shadow-sm rounded-md overflow-y-auto">
      {tests.length === 0 ? (
        <h2 className="font-semibold text-2xl flex items-center justify-center h-full">
          Brak Wniosków
        </h2>
      ) : (
        tests.map((test) => (
          <div
            key={test.id}
            className="flex w-full items-center justify-between border-t-1 hover:bg-gray-200"
          >
            <div
              className="w-full mb-1 p-2"
              onClick={() => {
                navigate(
                  `/patients/${patientId}/kindergarten-sheet/results/${test.id}`
                );
              }}
            >
              <h2 className="text-xl font-semibold">{test.date}</h2>
              <p className="text-gray-600">Godzina: 20:09</p>
            </div>
            <button
              className="m-1 p-2 hover:text-red-500"
              onClick={() => {
                handleDelete(test.id);
              }}
            >
              <FaRegTrashCan size={20} />
            </button>
          </div>
        ))
      )}
    </div>
  );
}
