interface CheckboxProps {
  title: string;
  checked: boolean;
  onChange: (title: string, checked: boolean) => void;
  size?: number;
}

export function Checkbox({
  title,
  checked,
  onChange,
  size = 20,
}: CheckboxProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(title, event.target.checked);
  };

  return (
    <div className="flex flex-col items-center">
      <span className="text-center font-semibold mb-2">{title}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        style={{ width: size, height: size }}
      />
    </div>
  );
}
