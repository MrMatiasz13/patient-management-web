import TopBar from "../components/TopBar";

const patients = [
  {
    name: "Maciej",
    surename: "Nowak",
  },
];

function PatientsScreen() {
  return (
    <div className="flex flex-col h-screen items-start">
      <TopBar />
      {patients.map((val) => {
        return (
          <div className="flex m-5 py-30 px-20 bg-white shadow-2xl">
            <div className="">{val.name}</div>
          </div>
        );
      })}
    </div>
  );
}

export default PatientsScreen;
