import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { usePatient } from "../../hooks/usePatient";
import { Patient } from "../../utils/types/patient";

function KindergartenSheetScreen() {
  const { id } = useParams<{ id: string }>();
  const { getPatientById } = usePatient();

  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      const fetchedPatient = await getPatientById(Number(id));
      if (fetchedPatient) setPatient(fetchedPatient);
    };

    fetchPatient();
  }, []);

  return (
    <div className="flex w-screen h-screen justify-center bg-gray-100">
      <div className="w-[50%] bg-white shadow-md py-8 px-16">
        <h1 className="font-bold text-2xl">
          Arkusz wyników badania mowy dla dzieci w wieku przedszkolnym
        </h1>
      </div>
    </div>
  );
}

export default KindergartenSheetScreen;
