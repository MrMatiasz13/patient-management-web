import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { usePatient } from "../../hooks/usePatient";
import { Patient } from "../../utils/types/models/patient";
import { ExaminationSection } from "../../components/ExaminationSection";
import {
  ScreeningTestData,
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
import { Heading } from "../../components/Heading";
import { PatientDataSection } from "../../components/PatientDataSection";

function KindergartenSheetScreen() {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const { getPatientById } = usePatient();
  const { createScreeningTest, error } = useScreeningTest();

  const [patient, setPatient] = useState<Patient | null>(null);
  const todayDate = new Date().toISOString().split("T")[0];

  const [formState, setFormState] = useState<
    Record<string, Record<string, boolean>>
  >({});
  const [conclusion, setConclusion] = useState<string>("");

  const handleCheckboxChange = (
    section: string,
    label: string,
    checked: boolean
  ) => {
    setFormState((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [label]: checked,
      },
    }));
  };

  useEffect(() => {
    const fetchPatient = async () => {
      const fetchedPatient = await getPatientById(Number(id));
      if (fetchedPatient) setPatient(fetchedPatient);
    };
    fetchPatient();

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

    const initialFormState: Record<string, Record<string, boolean>> = {};
    allSections.forEach((item) => {
      initialFormState[item.title] = {};

      item.items.forEach((field) => {
        initialFormState[item.title][field] = false;
      });
    });

    setFormState(initialFormState);
  }, [id]);

  const handleSave = async () => {
    const screeningTest: CreateScreeningTestDto = {
      patientId: patient!.id,
      date: todayDate,
      formState: formState,
    };

    await createScreeningTest(screeningTest);
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

        <PatientDataSection testDate={todayDate} patient={patient!} />

        <div className="w-full mt-8">
          <Heading title="Odbiór mowy - badanie rozumienia" />
          <ExaminationSection
            {...section3yo}
            section="blue"
            formState={formState["blue"] || {}}
            onCheckboxChange={(section, label, checked) =>
              handleCheckboxChange(section, label, checked)
            }
          />
          <ExaminationSection
            {...section4yo}
            section="red"
            formState={formState["red"] || {}}
            onCheckboxChange={(section, label, checked) =>
              handleCheckboxChange(section, label, checked)
            }
          />
          <ExaminationSection
            {...section5yo}
            section="green"
            formState={formState["green"] || {}}
            onCheckboxChange={(section, label, checked) =>
              handleCheckboxChange(section, label, checked)
            }
          />
          <ExaminationSection
            {...section6yo}
            section="orange"
            formState={formState["orange"] || {}}
            onCheckboxChange={(section, label, checked) =>
              handleCheckboxChange(section, label, checked)
            }
          />
        </div>

        <div className="w-full mt-8">
          <Heading title="Nadawanie mowy - wymowa/nazywanie obrazków" />
          <ExaminationSection
            {...section3yoSpeech}
            gridCols={3}
            section="speech3yo"
            formState={formState["speech3yo"] || {}}
            onCheckboxChange={(section, label, checked) =>
              handleCheckboxChange(section, label, checked)
            }
          />
          <ExaminationSection
            {...section4yoSpeech}
            gridCols={2}
            section="speech4yo"
            formState={formState["speech4yo"] || {}}
            onCheckboxChange={(section, label, checked) =>
              handleCheckboxChange(section, label, checked)
            }
          />
          <ExaminationSection
            {...section5yoSpeech}
            section="speech5yo"
            formState={formState["speech5yo"] || {}}
            onCheckboxChange={(section, label, checked) =>
              handleCheckboxChange(section, label, checked)
            }
          />
          <ExaminationSection
            {...section6yoSpeech}
            section="speech6yo"
            formState={formState["speech6yo"] || {}}
            onCheckboxChange={(section, label, checked) =>
              handleCheckboxChange(section, label, checked)
            }
          />
        </div>

        <div className="w-full mt-8">
          <Heading title="Sprawność narządów mowy" />
          <ExaminationSection
            {...section3yoSpeechOrgans}
            section="organs3yo"
            formState={formState["organs3yo"] || {}}
            onCheckboxChange={(section, label, checked) =>
              handleCheckboxChange(section, label, checked)
            }
          />
          <ExaminationSection
            {...section4yoSpeechOrgans}
            section="organs4yo"
            formState={formState["organs4yo"] || {}}
            onCheckboxChange={(section, label, checked) =>
              handleCheckboxChange(section, label, checked)
            }
          />
          <ExaminationSection
            {...section5yoSpeechOrgans}
            section="organs5yo"
            formState={formState["organs5yo"] || {}}
            onCheckboxChange={(section, label, checked) =>
              handleCheckboxChange(section, label, checked)
            }
          />
          <ExaminationSection
            {...section6yoSpeechOrgans}
            section="organs6yo"
            formState={formState["organs6yo"] || {}}
            onCheckboxChange={(section, label, checked) =>
              handleCheckboxChange(section, label, checked)
            }
          />
        </div>

        <div className="w-full mt-8">
          <Heading title="Zaobserwowane parafuncje" />
          <div className="grid grid-cols-4 gap-4 p-2">
            {parafunctions.map((title) => (
              <Checkbox
                key={title}
                title={title}
                checked={formState["parafunctions"]?.[title] || false}
                onChange={(label, checked) =>
                  handleCheckboxChange("parafunctions", label, checked)
                }
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

export default KindergartenSheetScreen;
