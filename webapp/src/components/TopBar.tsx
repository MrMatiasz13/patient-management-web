import { MdOutlineSort } from "react-icons/md";
import { useAuth } from "../hooks/useAuth";

function TopBar() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="flex w-screen py-5 items-center justify-between bg-white shadow">
      <div className="flex h-full mx-5 justify-center items-center">
        <button className="cursor-pointer">
          <MdOutlineSort size={35} />
        </button>
        <span className="mx-30 font-bold text-4xl">Logobud</span>
      </div>
      <button
        className="bg-[#007bff] hover:bg-[#0069d9] text-white font-bold py-3 px-7 mx-5 rounded-2xl cursor-pointer"
        onClick={handleLogout}
      >
        Wyloguj
      </button>
    </div>
  );
}

export default TopBar;
