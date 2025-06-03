interface RequiredFieldNameProps {
  name: string;
}

export function RequiredFieldName({ name }: RequiredFieldNameProps) {
  return (
    <div className="flex w-full gap-2">
      <h1 className="font-semibold text-xl">{name}</h1>
      <span className="text-red-500 text-xl">*</span>
    </div>
  );
}
