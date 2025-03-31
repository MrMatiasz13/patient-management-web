import { FaEnvelope, FaLock } from "react-icons/fa";

function AuthPage() {
  const styles = {
    inputContainer: "flex justify-center relative mb-2 group",
    input:
      "flex-1 bg-gray-200 outline-none rounded-sm mx-8 p-3 pl-11 text-lg placeholder:text-lg",
    icon: "absolute left-12 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-purple-800",
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-[#1e3a8a] to-purple-800">
      <div className="bg-white max-w-lg w-[100%] rounded-lg shadow-lg">
        <div className="p-4">
          <h2 className="text-center text-3xl text-purple-800 font-bold my-4">
            Logowanie
          </h2>
        </div>

        <form>
          <div className={styles.inputContainer}>
            <FaEnvelope size={20} className={styles.icon} />
            <input type="text" placeholder="Login" className={styles.input} />
          </div>

          <div className={styles.inputContainer}>
            <FaLock size={20} className={styles.icon} />
            <input
              type="password"
              placeholder="Password"
              className={styles.input}
            />
          </div>

          <div className="flex justify-end my-4 mx-8">
            <button
              type="submit"
              className="bg-purple-800 hover:bg-purple-950 text-white font-bold py-3 px-6 rounded-sm"
            >
              Zaloguj
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AuthPage;
