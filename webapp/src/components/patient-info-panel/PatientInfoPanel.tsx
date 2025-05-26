import { FaRegClipboard } from "react-icons/fa";
import { IoDocumentTextOutline, IoOpenOutline, IoAdd } from "react-icons/io5";
import { GrNotes } from "react-icons/gr";
import { Patient } from "../../utils/types/patient";
import { useRef } from "react";
import AddConclusionDialog, {
  AddConclusionDialogRef,
} from "./AddConclusionDialog";
import { calculateAge } from "../../utils/helpers/CalculateAge";

interface PatientInfoPanelProps {
  selectedPatient: Patient | null;
}

const mockedDocuments = [
  {
    id: 1,
    title: "Oświadczenie o niepełnosprawności",
  },
  {
    id: 2,
    title: "Oświadczenie o suczkach",
  },
];

function PatientInfoPanel({ selectedPatient }: PatientInfoPanelProps) {
  const dialogRef = useRef<AddConclusionDialogRef>(null);

  if (!selectedPatient) {
    return <></>;
  }

  const openAddPatientDialog = () => {
    if (!dialogRef.current) {
      return;
    }
    dialogRef.current.open();
  };

  return (
    <div className="w-2/3 bg-gray-50 h-screen overflow-hidden">
      <div className="p-5 border-b border-gray-400">
        <h1 className="font-bold text-3xl">Informację o Pacjencie</h1>
      </div>

      <div className="flex flex-col w-full p-5 gap-2 h-[calc(100vh-80px)]">
        <div className="flex flex-col gap-2 h-full">
          <div className="flex items-center gap-2">
            <FaRegClipboard className={styles.sectionIcon} />
            <h2 className={styles.sectionTitle}>Szczegóły Pacjenta</h2>
          </div>

          <div className={styles.sectionContainer}>
            <div className="grid grid-cols-3 gap-4">
              <PatientInfo
                title="Imię i nazwisko"
                data={`${selectedPatient.name} ${selectedPatient.surname}`}
              />
              <PatientInfo
                title="Wiek"
                data={`${calculateAge(`${selectedPatient.birthDate}`)} lat`}
              />
              <PatientInfo
                title="Telefon"
                data={`${selectedPatient.phoneNumber}`}
              />
            </div>
          </div>

          <div className="flex w-full flex-1 gap-2 mt-2 min-h-0">
            <div className="w-1/2 h-full">
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <IoDocumentTextOutline className={styles.sectionIcon} />
                  <h2 className={styles.sectionTitle}>Dokumenty</h2>
                </div>

                <button className={styles.button}>
                  <IoAdd className="text-xl" />
                  Dodaj Dokument
                </button>
              </div>

              <div className={styles.sectionContainer}>
                {mockedDocuments.map((item, index) => (
                  <div
                    className={`flex p-2 items-center justify-between ${index != 0 && "border-t-1 border-gray-400"}`}
                  >
                    <h2 className="text-blue-500 text-xl">{item.title}</h2>
                    <button>
                      <IoOpenOutline className="text-blue-700 text-xl" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-1/2 h-full">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <GrNotes className={styles.sectionIcon} />
                    <h2 className={styles.sectionTitle}>Wnioski z Badań</h2>
                  </div>

                  <button
                    className={styles.button}
                    onClick={openAddPatientDialog}
                  >
                    <IoAdd className="text-xl" />
                    Nowy Wniosek
                  </button>
                </div>

                <div className="flex flex-1 items-center justify-center bg-white p-4 mt-2 shadow-sm rounded-md">
                  <h2 className="font-semibold text-2xl">Brak Wniosków</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddConclusionDialog patient={selectedPatient} ref={dialogRef} />
    </div>
  );
}

const styles = {
  sectionContainer: "bg-white p-4 mt-2 shadow-sm rounded-md",
  sectionTitle: "font-semibold text-2xl",
  sectionIcon: "text-blue-600 text-3xl",
  button:
    "flex items-center bg-[#007bff] hover:bg-[#0069d9] text-white px-2 py-1 rounded-md cursor-pointer",
};

type PatientInfoProps = {
  title: string;
  data: string;
};

const PatientInfo = ({ title, data }: PatientInfoProps) => {
  return (
    <div>
      <p className="text-lg text-gray-500">{title}:</p>
      <p className="text-lg">{data}</p>
    </div>
  );
};

export default PatientInfoPanel;
