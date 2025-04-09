import { useUser } from "../hooks/useUser";

function HomeScreen() {
  const { user } = useUser();

  return <div>Hello {user?.username}</div>;
}

export default HomeScreen;
