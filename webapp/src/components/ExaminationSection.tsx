import { Checkbox } from "./Checkbox";

export interface ExaminationSectionProps {
  title: string;
  items: string[];
  color: "blue" | "green" | "orange" | "red";
  gridCols?: number;
  section: string;
}

const colorMap = {
  blue: {
    text: "text-blue-600",
    border: "border-blue-600",
  },
  green: {
    text: "text-green-600",
    border: "border-green-600",
  },
  orange: {
    text: "text-orange-600",
    border: "border-orange-600",
  },
  red: {
    text: "text-red-600",
    border: "border-red-600",
  },
};

export function ExaminationSection({
  title,
  items,
  color,
  gridCols = 2,
  section,
}: ExaminationSectionProps) {
  const colors = colorMap[color];

  return (
    <div className="mb-4">
      <h2 className={`font-semibold text-xl ${colors.text}`}>{title}</h2>
      <div className={`p-1 border-l-3 border- ${colors.border}`}>
        <div
          className={`grid grid-cols-${gridCols} gap-4 p-2 bg-gray-200 rounded`}
        >
          {items.map((item, index) => (
            <div key={index}>
              <Checkbox label={item} section={section} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
