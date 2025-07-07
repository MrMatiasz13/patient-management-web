import { useParams } from "react-router";
import { usePatient } from "../../hooks/usePatient";
import { useEffect, useState } from "react";
import { Patient } from "../../utils/types/models/patient";
import { ScreeningTest } from "../../utils/types/models/screeningTest";
import { useScreeningTest } from "../../hooks/useScreeningTest";
import { PatientDataSection } from "../../components/PatientDataSection";
import { Heading } from "../../components/Heading";
import { TestResult } from "../../components/TestResult";
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
import { parafunctions } from "../../utils/data/parafunctionsData";

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

  console.log(screeningTest.conclusion);

  return (
    <div className="flex min-h-screen w-screen justify-center bg-gray-100 overflow-y-auto">
      <div className="w-[55%] bg-white shadow-md py-8 px-16">
        <h1 className="font-bold text-3xl">
          Badanie mowy dla dzieci w wieku przedszkolnym
        </h1>
        <div className="w-[calc(100%+3rem)] h-0.5 bg-gray-600 my-4 -mx-6"></div>

        <PatientDataSection testDate={screeningTest.date} patient={patient} />

        <div className="w-full mt-8">
          <Heading title="Odbiór mowy - badanie zrozumienia" />
          <TestResult
            screeningTest={screeningTest}
            sections={[section3yo, section4yo, section5yo, section6yo]}
          />
        </div>
        <div className="w-full mt-8">
          <Heading title="Nadawanie mowy - wymowa/nazywanie obrazków" />
          <TestResult
            screeningTest={screeningTest}
            sections={[
              section3yoSpeech,
              section4yoSpeech,
              section5yoSpeech,
              section6yoSpeech,
            ]}
          />
        </div>
        <div className="w-full mt-8">
          <Heading title="Sprawność narządów mowy" />
          <TestResult
            screeningTest={screeningTest}
            sections={[
              section3yoSpeechOrgans,
              section4yoSpeechOrgans,
              section5yoSpeechOrgans,
              section6yoSpeechOrgans,
            ]}
          />
        </div>
        <div className="w-full mt-8">
          <Heading title="Zaobserwowane parafuncje" />
          <TestResult
            screeningTest={screeningTest}
            sections={[
              {
                title: "Parafunkcje",
                section: "parafunctions",
                items: parafunctions,
                color: "blue",
              },
            ]}
          />
        </div>

        <div className="w-full mt-8">
          <Heading title="Wnioski" />
          {!screeningTest.conclusion ? (
            "Brak Wniosków"
          ) : (
            <div>{screeningTest.conclusion}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TestResultScreen;
