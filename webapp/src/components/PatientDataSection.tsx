import { calculateAge } from "../utils/helpers/calculateAge";
import { Patient } from "../utils/types/models/patient";
import { Heading } from "./Heading";
import { InfoField } from "./InfoField";

interface PatinetDataSectionProps {
  testDate: string;
  patient: Patient;
}

export function PatientDataSection({
  testDate,
  patient,
}: PatinetDataSectionProps) {
  return (
    <div className="w-full mt-8">
      <Heading title="Informacje" />
      <div className="grid grid-cols-2 gap-6">
        <InfoField label="Data Badania" value={testDate} />
        <InfoField
          label="Imię i Nazwisko"
          value={`${patient?.name} ${patient?.surname}`}
        />
        <InfoField
          label="Wiek"
          value={`${patient?.birthDate && calculateAge(patient.birthDate)} lat`}
        />
        <InfoField label="Data Urodzenia" value={patient?.birthDate} />
      </div>
    </div>
  );
}
