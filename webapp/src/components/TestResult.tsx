import { ScreeningTestData } from "../utils/data/examinationSectionData";
import { ScreeningTest } from "../utils/types/models/screeningTest";

interface TestResultProps {
  screeningTest: ScreeningTest;
  sections: ScreeningTestData[];
}

export function TestResult({ screeningTest, sections }: TestResultProps) {
  return (
    <div>
      {sections.map((section) => (
        <div key={section.title} className="mb-4">
          <h2 className={`font-semibold text-xl`}>{section.title}</h2>
          <div className={`grid grid-cols-2 gap-4 p-2 bg-gray-200 rounded`}>
            {Object.entries(screeningTest.formState[section.section]).map(
              ([checkboxKey, checkboxValue]) => (
                <div key={checkboxKey} className="flex flex-col items-center">
                  <span className="text-center font-semibold mb-2">
                    {checkboxKey}:
                  </span>
                  <input
                    type="checkbox"
                    readOnly
                    checked={checkboxValue}
                    style={{ width: 20, height: 20 }}
                  />
                </div>
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
