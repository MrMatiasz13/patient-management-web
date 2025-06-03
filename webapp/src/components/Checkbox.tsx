import { useState } from "react";

interface CheckboxProps {
  title: string;
  size?: number;
}

export function Checkbox({ title, size = 20 }: CheckboxProps) {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div className="flex flex-col items-center">
      <span className="text-center font-semibold mb-2">{title}</span>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        style={{ width: size, height: size }}
      />
    </div>
  );
}
