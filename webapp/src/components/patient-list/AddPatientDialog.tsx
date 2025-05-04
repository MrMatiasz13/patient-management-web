import { forwardRef, Ref, useImperativeHandle, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { usePatient } from "../../hooks/usePatient";
import { Patient } from "../../utils/types/patient";

export type AddPatientDialogRef = {
  open: () => void;
};

interface AddPatientDialogProps {
  onPatientAdded?: () => void;
}

function AddPatientDialog(
  { onPatientAdded }: AddPatientDialogProps,
  ref: Ref<AddPatientDialogRef>
) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  const dialogRef = useRef<HTMLDialogElement>(null);

  const { addPatient } = usePatient();

  useImperativeHandle(ref, () => ({
    open: () => {
      dialogRef.current?.showModal();
    },
  }));

  const handleClose = async () => {
    dialogRef.current?.close();
    setName("");
    setSurname("");
    setPhone("");
    setAdditionalInfo("");
  };

  const handleAddPatient = async () => {
    const patient: Partial<Patient> = {
      name: name,
      surname: surname,
      phoneNumber: phone,
    };

    await addPatient(patient);
    onPatientAdded?.();
    await handleClose();
  };

  return (
    <dialog
      className="p-6 rounded-2xl w-130 bg-white shadow-2xl backdrop:bg-black/50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      ref={dialogRef}
      onClose={handleClose}
    >
      <div className="flex w-full justify-between items-center">
        <h2 className="font-bold text-3xl">Dodaj Nowego Pacjenta</h2>
        <div className="flex h-full items-center text-gray-400 hover:text-black">
          <IoClose size={30} onClick={handleClose} />
        </div>
      </div>
      <div className="w-[calc(100%+3rem)] h-px bg-gray-400 my-4 -mx-6"></div>

      <form className="flex flex-col w-full" onSubmit={async (e) => {
        e.preventDefault();
        await handleAddPatient();
      }}>
        {requiredFieldName("Imię")}
        <input
          className={styles.input}
          type="text"
          name="Imię"
          placeholder="Podaj Imię"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        {requiredFieldName("Nazwisko")}
        <input
          className={styles.input}
          type="text"
          name="Nazwisko"
          placeholder="Podaj Nazwisko"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          required
        />
        <h1 className="font-semibold text-xl">Telefon</h1>
        <input
          className={styles.input}
          type="text"
          placeholder="Podaj Numer Telefonu"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <h1 className="font-semibold text-xl">Dodatkowe informację</h1>
        <textarea
          className="w-full h-30 p-2 rounded-md my-2 border-gray-400 border-1"
          placeholder="Podaj dodatkowe informację (jeśli potrzeba)"
          value={additionalInfo}
          onChange={(e) => setAdditionalInfo(e.target.value)}
        />
        <div className="flex w-full gap-2 mt-2 items-center justify-end">
          <button
            className="py-3 px-7 rounded-xl border-gray-400 border-1 cursor-pointer"
            onClick={async (e) => {
              e.preventDefault();
              await handleClose();
            }}
          >
            Anuluj
          </button>
          <button
            type="submit"
            className="bg-[#007bff] hover:bg-[#0069d9] text-white font-bold py-3 px-7 rounded-xl cursor-pointer"
          >
            Zapisz Pacjenta
          </button>
        </div>
      </form>
    </dialog>
  );
}

function requiredFieldName(name: string) {
  return (
    <div className="flex w-full gap-2">
      <h1 className="font-semibold text-xl">{name}</h1>
      <span className="text-red-500 text-xl">*</span>
    </div>
  );
}

const styles = {
  input: "w-full p-2 rounded-md my-2 border-gray-400 border-1",
};

export default forwardRef(AddPatientDialog);
