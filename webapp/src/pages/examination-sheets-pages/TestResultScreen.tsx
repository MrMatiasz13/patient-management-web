import { useParams } from "react-router";
import { usePatient } from "../../hooks/usePatient";
import { useEffect, useState } from "react";
import { Patient } from "../../utils/types/models/patient";
import { ScreeningTest } from "../../utils/types/models/screeningTest";
import { useScreeningTest } from "../../hooks/useScreeningTest";
import { PatientDataSection } from "../../components/PatientDataSection";
import { Heading } from "../../components/Heading";
import {
  ScreeningTestData,
  section3yo,
  section4yo,
  section5yo,
  section6yo,
} from "../../utils/data/examinationSectionData";
import {
  section3yoSpeechOrgans,
  section4yoSpeechOrgans,
  section5yoSpeechOrgans,
  section6yoSpeechOrgans,
} from "../../utils/data/speechOrgansSectionData";
import {
  section3yoSpeech,
  section4yoSpeech,
  section5yoSpeech,
  section6yoSpeech,
} from "../../utils/data/speechSectionData";

function TestResultScreen() {
  const { id, testId } = useParams<{ id: string; testId: string }>();
  const { getPatientById } = usePatient();
  const { getScreeningTestById } = useScreeningTest();

  const [patient, setPatient] = useState<Patient>();
  const [screeningTest, setScreeningTest] = useState<ScreeningTest>();

  useEffect(() => {
    const fetchData = async () => {
      const fetchedPatient = await getPatientById(Number(id));
      if (fetchedPatient) setPatient(fetchedPatient);

      const fetchedTest = await getScreeningTestById(Number(testId));
      if (fetchedTest) setScreeningTest(fetchedTest);
    };
    fetchData();
  }, [id, testId]);

  if (!screeningTest || !patient) return <div>Loading...</div>;

  console.log(screeningTest.formState);

  const allSections: ScreeningTestData[] = [
    section3yo,
    section4yo,
    section5yo,
    section6yo,
    section3yoSpeech,
    section4yoSpeech,
    section5yoSpeech,
    section6yoSpeech,
    section3yoSpeechOrgans,
    section4yoSpeechOrgans,
    section5yoSpeechOrgans,
    section6yoSpeechOrgans,
  ];

  return (
    <div className="flex min-h-screen w-screen justify-center bg-gray-100 overflow-y-auto">
      <div className="w-[55%] bg-white shadow-md py-8 px-16">
        <h1 className="font-bold text-3xl">
          Badanie mowy dla dzieci w wieku przedszkolnym
        </h1>
        <div className="w-[calc(100%+3rem)] h-0.5 bg-gray-600 my-4 -mx-6"></div>

        <PatientDataSection testDate={screeningTest.date} patient={patient} />

        <div className="w-full mt-8">
          <Heading title="Wyniki" />
          <div className="flex flex-col">
            {allSections.map((item) => (
              <div>{item.title}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestResultScreen;
