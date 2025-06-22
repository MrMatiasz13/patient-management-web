interface HeadingProps {
  title: string;
}
export const Heading = ({ title }: HeadingProps) => {
  return (
    <>
      <h2 className="font-bold text-xl">{title}: </h2>
      <div className="w-[calc(100%+3rem)] h-px bg-gray-400 my-2 -mx-6"></div>
    </>
  );
};
