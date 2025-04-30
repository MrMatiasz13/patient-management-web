import { forwardRef, Ref, useImperativeHandle, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { usePatient } from "../hooks/usePatient";
import { Patient } from "../utils/types/patient";

export type AddPatientDialogRef = {
  open: () => void;
  close: () => void;
};

type AddPatientDialogProps = {};

function AddPatientDialog(
  _: AddPatientDialogProps,
  ref: Ref<AddPatientDialogRef>
) {
  const [name, setName] = useState("");
  const [surename, setSurename] = useState("");
  const [phone, setPhone] = useState("");

  const dialogRef = useRef<HTMLDialogElement>(null);

  const { addPatient } = usePatient();

  useImperativeHandle(ref, () => ({
    open: () => {
      dialogRef.current?.showModal();
    },
    close: () => {
      dialogRef.current?.close();
    },
  }));

  const clearInputs = () => {
    setName("");
    setSurename("");
    setPhone("");
  };

  const handleAddPatient = async () => {
    const patient: Patient = {
      name: name,
      surename: surename,
      phoneNumber: phone,
    };

    await addPatient(patient);
  };

  return (
    <dialog
      ref={dialogRef}
      className="rounded-2xl p-8 shadow-2xl backdrop:bg-black/30 w-96 max-w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fixed"
    >
      <button
        onClick={() => {
          dialogRef.current?.close();
          clearInputs();
        }}
        className="absolute top-2 right-2 text-black hover:text-gray-600"
      >
        <IoClose size={32} />
      </button>

      <h2 className="flex w-full justify-center mt-2 mb-2 text-2xl font-bold">
        Dodaj Pacjęta
      </h2>

      <form className="flex flex-col w-full gap-2">
        <input
          className="w-full p-2 rounded-2xl border"
          type="text"
          placeholder="Imię"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full p-2 rounded-2xl border"
          type="text"
          placeholder="Nazwisko"
          value={surename}
          onChange={(e) => setSurename(e.target.value)}
        />
        <input
          className="w-full p-2 rounded-2xl border"
          type="tel"
          placeholder="Telefon"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button
          className="bg-[#007bff] hover:bg-[#0069d9] text-white font-bold px-2 py-2 border rounded-2xl"
          onClick={handleAddPatient}
        >
          Dodaj
        </button>
      </form>
    </dialog>
  );
}

export default forwardRef(AddPatientDialog);
