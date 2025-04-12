import { useAuth } from "../hooks/useAuth";
import { useUser } from "../hooks/useUser";

function HomeScreen() {
  const { user } = useUser();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="flex flex-col gap-y-4 h-screen justify-center items-center text-5xl font-bold">
      <div>Hello {user?.name}</div>
      <form>
        <button type="button" onClick={handleLogout}>
          Wygoluj
        </button>
      </form>
    </div>
  );
}

export default HomeScreen;
