import React from "react";

interface InfoFieldProps {
  label: string;
  value: string | number | React.ReactNode;
}

export function InfoField({ label, value }: InfoFieldProps) {
  return (
    <div>
      <label className="font-semibold text-sm text-gray-700">{label}:</label>
      <div className="text-sm border-b-1">{value}</div>
    </div>
  );
}
