import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { usePatient } from "../../hooks/usePatient";
import { Patient } from "../../utils/types/models/patient";
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
import { Heading } from "../../components/Heading";
import { PatientDataSection } from "../../components/PatientDataSection";
import { FormProvider, useForm } from "react-hook-form";

type FormValues = {
  sections: Record<string, Record<string, boolean>>;
  conclusion: string;
};

function KindergartenSheetScreen() {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const { getPatientById } = usePatient();

  const [patient, setPatient] = useState<Patient | null>(null);
  const todayDate = new Date().toISOString().split("T")[0];

  const methods = useForm<FormValues>({
    defaultValues: {
      sections: {},
      conclusion: "",
    },
  });

  useEffect(() => {
    const fetchPatient = async () => {
      const fetchedPatient = await getPatientById(Number(id));
      if (fetchedPatient) setPatient(fetchedPatient);
    };
    fetchPatient();
  }, [id]);

  const handleSubmit = methods.handleSubmit((data) => {
    console.log("Form data: ", data);
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit}>
        <div className="flex min-h-screen w-screen justify-center bg-gray-100 overflow-y-auto">
          <div className="w-[55%] bg-white shadow-md py-8 px-16">
            <h1 className="font-bold text-3xl">
              Arkusz wyników badania mowy dla dzieci w wieku przedszkolnym
            </h1>
            <div className="w-[calc(100%+3rem)] h-0.5 bg-gray-600 my-4 -mx-6"></div>

            <PatientDataSection testDate={todayDate} patient={patient!} />

            <div className="w-full mt-8">
              <Heading title="Odbiór mowy - badanie rozumienia" />
              <ExaminationSection {...section3yo} />
              <ExaminationSection {...section4yo} />
              <ExaminationSection {...section5yo} />
              <ExaminationSection {...section6yo} />
            </div>

            <div className="w-full mt-8">
              <Heading title="Nadawanie mowy - wymowa/nazywanie obrazków" />
              <ExaminationSection {...section3yoSpeech} gridCols={3} />
              <ExaminationSection {...section4yoSpeech} gridCols={2} />
              <ExaminationSection {...section5yoSpeech} />
              <ExaminationSection {...section6yoSpeech} />
            </div>

            <div className="w-full mt-8">
              <Heading title="Sprawność narządów mowy" />
              <ExaminationSection {...section3yoSpeechOrgans} />
              <ExaminationSection {...section4yoSpeechOrgans} />
              <ExaminationSection {...section5yoSpeechOrgans} />
              <ExaminationSection {...section6yoSpeechOrgans} />
            </div>

            <div className="w-full mt-8">
              <Heading title="Zaobserwowane parafuncje" />
              <div className="grid grid-cols-4 gap-4 p-2">
                {parafunctions.map((title) => (
                  <Checkbox key={title} label={title} section="parafunctions" />
                ))}
              </div>
            </div>

            <div className="w-full mt-8">
              <Heading title="Wnioski" />
              <textarea
                className="w-full p-2 rounded-md mt-2 border-gray-400 border-1 min-h-[200px]"
                placeholder="Zapisz tu wnioski z badania..."
                defaultValue={""}
                {...methods.register("conclusion")}
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
                type="submit"
                disabled={!patient}
                className="bg-[#007bff] hover:bg-[#0069d9] text-white font-bold py-2 px-6 rounded-xl cursor-pointer"
              >
                Zapisz
              </button>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}

export default KindergartenSheetScreen;
