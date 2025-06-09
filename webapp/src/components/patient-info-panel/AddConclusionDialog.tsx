import { forwardRef, Ref, useImperativeHandle, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router";
import { Patient } from "../../utils/types/models/patient";

export type AddConclusionDialogRef = {
  open: () => void;
};

interface AddConclusionDialogProps {
  patient: Patient;
}

function AddConclusionDialog(
  { patient }: AddConclusionDialogProps,
  ref: Ref<AddConclusionDialogRef>
) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const navigate = useNavigate();

  useImperativeHandle(ref, () => ({
    open: () => {
      dialogRef.current?.showModal();
    },
  }));

  const handleClose = async () => {
    dialogRef.current?.close();
  };

  return (
    <dialog
      className="p-6 rounded-2xl w-130 bg-white shadow-2xl backdrop:bg-black/50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      ref={dialogRef}
      onClose={handleClose}
    >
      <div className="flex w-full justify-between items-center">
        <h2 className="font-bold text-3xl">Wybierz kartę badania</h2>
        <div className="flex h-full items-center text-gray-400 hover:text-black">
          <IoClose size={30} onClick={handleClose} />
        </div>
      </div>
      <div className="w-[calc(100%+3rem)] h-px bg-gray-400 my-4 -mx-6"></div>

      <div className="flex flex-col w-full justify-center items-center gap-2">
        <button
          className={styles.button}
          onClick={() => {
            navigate(`/patients/${patient.id}/kindergarten-sheet`);
          }}
        >
          Dzieci w wieku przedszkolnym
        </button>
        <button className={styles.button}>Dzieci i dorośli</button>
      </div>
    </dialog>
  );
}

const styles = {
  button:
    "w-full p-4 font-semibold text-xl rounded-md border-1 border-gray-400 shadow-sm bg-white hover:bg-[#0069d9] hover:text-white cursor-pointer",
};

export default forwardRef(AddConclusionDialog);
