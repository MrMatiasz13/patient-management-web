import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { usePatient } from "../../hooks/usePatient";
import { Patient } from "../../utils/types/models/patient";
import { calculateAge } from "../../utils/helpers/calculateAge";
import { InfoField } from "../../components/InfoField";
import { ExaminationSection } from "../../components/ExaminationSection";
import {
  section3yo,
  section4yo,
  section5yo,
  section6yo,
} from "../../utils/data/examinationSectionData";
import {
  section3yoSpeech,
  section4yoSpeech,
  section5yoSpeech,
  section6yoSpeech,
} from "../../utils/data/speechSectionData";
import {
  section3yoSpeechOrgans,
  section4yoSpeechOrgans,
  section5yoSpeechOrgans,
  section6yoSpeechOrgans,
} from "../../utils/data/speechOrgansSectionData";
import { Checkbox } from "../../components/Checkbox";
import { parafunctions } from "../../utils/data/parafunctionsData";
import { useScreeningTest } from "../../hooks/useScreeningTest";
import { CreateScreeningTestDto } from "../../utils/types/models/dtos/createScreeningTestDto";

function KindergartenSheetScreen() {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const { getPatientById } = usePatient();
  const { createScreeningTest, error } = useScreeningTest();

  const [patient, setPatient] = useState<Patient | null>(null);
  const todayDate = new Date().toISOString().split("T")[0];

  const [formState, setFormState] = useState<Record<string, boolean>>({});
  const [conclusion, setConclusion] = useState("");

  const handleCheckboxChange = (label: string, checked: boolean) => {
    setFormState((prev) => ({
      ...prev,
      [label]: checked,
    }));
  };

  useEffect(() => {
    const fetchPatient = async () => {
      const fetchedPatient = await getPatientById(Number(id));
      if (fetchedPatient) setPatient(fetchedPatient);
    };
    fetchPatient();

    const allFormLabels = [
      ...section3yo.items,
      ...section4yo.items,
      ...section5yo.items,
      ...section6yo.items,
      ...section3yoSpeech.items,
      ...section4yoSpeech.items,
      ...section5yoSpeech.items,
      ...section6yoSpeech.items,
      ...section3yoSpeechOrgans.items,
      ...section4yoSpeechOrgans.items,
      ...section5yoSpeechOrgans.items,
      ...section6yoSpeechOrgans.items,
      ...parafunctions,
    ];

    const initialFormState: Record<string, boolean> = {};
    allFormLabels.forEach((item) => {
      initialFormState[item] = false;
    });

    setFormState(initialFormState);
  }, [id]);

  const handleSave = async () => {
    const screeningTestData: CreateScreeningTestDto = {
      patientId: patient!.id,
      date: todayDate,
      formState: formState,
      conclusion: conclusion,
    };

    await createScreeningTest(screeningTestData);
    if (!error) {
      alert("Zapisywanie sie powiodło.");
      navigate(-1);
    } else {
      alert(error);
    }
  };

  return (
    <div className="flex min-h-screen w-screen justify-center bg-gray-100 overflow-y-auto">
      <div className="w-[55%] bg-white shadow-md py-8 px-16">
        <h1 className="font-bold text-3xl">
          Arkusz wyników badania mowy dla dzieci w wieku przedszkolnym
        </h1>
        <div className="w-[calc(100%+3rem)] h-0.5 bg-gray-600 my-4 -mx-6"></div>

        <div className="w-full mt-8">
          <Heading title="Informacje" />
          <div className="grid grid-cols-2 gap-6">
            <InfoField label="Data Badania" value={todayDate} />
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

        <div className="w-full mt-8">
          <Heading title="Odbiór mowy - badanie rozumienia" />
          <ExaminationSection
            {...section3yo}
            formState={formState}
            onCheckboxChange={handleCheckboxChange}
          />
          <ExaminationSection
            {...section4yo}
            formState={formState}
            onCheckboxChange={handleCheckboxChange}
          />
          <ExaminationSection
            {...section5yo}
            formState={formState}
            onCheckboxChange={handleCheckboxChange}
          />
          <ExaminationSection
            {...section6yo}
            formState={formState}
            onCheckboxChange={handleCheckboxChange}
          />
        </div>

        <div className="w-full mt-8">
          <Heading title="Nadawanie mowy - wymowa/nazywanie obrazków" />
          <ExaminationSection
            {...section3yoSpeech}
            gridCols={3}
            formState={formState}
            onCheckboxChange={handleCheckboxChange}
          />
          <ExaminationSection
            {...section4yoSpeech}
            gridCols={2}
            formState={formState}
            onCheckboxChange={handleCheckboxChange}
          />
          <ExaminationSection
            {...section5yoSpeech}
            formState={formState}
            onCheckboxChange={handleCheckboxChange}
          />
          <ExaminationSection
            {...section6yoSpeech}
            formState={formState}
            onCheckboxChange={handleCheckboxChange}
          />
        </div>

        <div className="w-full mt-8">
          <Heading title="Sprawność narządów mowy" />
          <ExaminationSection
            {...section3yoSpeechOrgans}
            formState={formState}
            onCheckboxChange={handleCheckboxChange}
          />
          <ExaminationSection
            {...section4yoSpeechOrgans}
            formState={formState}
            onCheckboxChange={handleCheckboxChange}
          />
          <ExaminationSection
            {...section5yoSpeechOrgans}
            formState={formState}
            onCheckboxChange={handleCheckboxChange}
          />
          <ExaminationSection
            {...section6yoSpeechOrgans}
            formState={formState}
            onCheckboxChange={handleCheckboxChange}
          />
        </div>

        <div className="w-full mt-8">
          <Heading title="Zaobserwowane parafuncje" />
          <div className="grid grid-cols-4 gap-4 p-2">
            {parafunctions.map((title) => (
              <Checkbox
                key={title}
                title={title}
                checked={formState[title]}
                onChange={handleCheckboxChange}
              />
            ))}
          </div>
        </div>

        <div className="w-full mt-8">
          <Heading title="Wnioski" />
          <textarea
            className="w-full p-2 rounded-md mt-2 border-gray-400 border-1 min-h-[200px]"
            placeholder="Zapisz tu wnioski z badania..."
            value={conclusion}
            onChange={(e) => setConclusion(e.target.value)}
          />
        </div>

        <div className="flex w-full items-center justify-end my-2 gap-2">
          <button
            className="py-2 px-6 rounded-xl border-gray-400 border-1 cursor-pointer"
            onClick={() => {
              navigate(-1);
            }}
          >
            Anuluj
          </button>
          <button
            onClick={handleSave}
            disabled={!patient}
            className="bg-[#007bff] hover:bg-[#0069d9] text-white font-bold py-2 px-6 rounded-xl cursor-pointer"
          >
            Zapisz
          </button>
        </div>
      </div>
    </div>
  );
}

interface HeadingProps {
  title: string;
}
const Heading = ({ title }: HeadingProps) => {
  return (
    <>
      <h2 className="font-bold text-xl">{title}: </h2>
      <div className="w-[calc(100%+3rem)] h-px bg-gray-400 my-2 -mx-6"></div>
    </>
  );
};

export default KindergartenSheetScreen;
