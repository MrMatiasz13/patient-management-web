import { FaEnvelope, FaLock } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";
import { useUser } from "../hooks/useUser";

function AuthScreen() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { user, token } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    await login(email, password);
  };

  useEffect(() => {
    if (user && token) {
      navigate("/patients");
    }
  }, [user, token]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white max-w-lg w-[100%] border-1 border-gray-400 rounded-lg">
        <div className="p-4">
          <h2 className="text-center text-3xl text-black font-bold my-4">
            Logowanie
          </h2>
        </div>

        <form>
          <div className={styles.inputContainer}>
            <FaEnvelope size={20} className={styles.icon} />
            <input
              id="userEmail"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              autoComplete="email"
              className={styles.input}
            />
          </div>

          <div className={styles.inputContainer}>
            <FaLock size={20} className={styles.icon} />
            <input
              id="userPassword"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Hasło"
              autoComplete="current-password"
              className={styles.input}
            />
          </div>

          <div className="flex justify-end my-4 mx-8">
            <button
              type="button"
              className="flex items-center bg-[#007bff] hover:bg-[#0069d9] text-white px-3 py-2 rounded-md cursor-pointer"
              onClick={handleLogin}
            >
              Zaloguj się
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  inputContainer: "flex justify-center relative mb-2 group",
  input:
    "flex-1 bg-gray-200 outline-none rounded-sm mx-8 p-3 pl-11 text-lg placeholder:text-lg",
  icon: "absolute left-12 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-[#007bff]",
};

export default AuthScreen;
