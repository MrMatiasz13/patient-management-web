import SideBar from "../components/side-bar/SideBar";
import { useAuth } from "../hooks/useAuth";

function HomeScreen() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="flex">
      <SideBar />
      <div className="flex h-screen w-screen justify-center items-center">
        <button className="font-bold text-lg" onClick={handleLogout}>
          Wyloguj
        </button>
      </div>
    </div>
  );
}

export default HomeScreen;
