import { useFormContext } from "react-hook-form";

interface CheckboxProps {
  label: string;
  section: string;
  size?: number;
}

export function Checkbox({ label, section, size = 20 }: CheckboxProps) {
  const { register, watch } = useFormContext();

  return (
    <div className="flex flex-col items-center">
      <span className="text-center font-semibold mb-2">{label}</span>
      <input
        type="checkbox"
        checked={watch(`sections.${section}.${label}`) || false}
        {...register(`sections.${section}.${label}`)}
        style={{ width: size, height: size }}
      />
    </div>
  );
}
