function AuthPage() {
  const Styles = {
    input: "flex-1 bg-gray-200 outline-none rounded-sm mx-8 mb-2 p-3",
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-[#1e3a8a] to-purple-800">
      <div className="bg-white max-w-lg w-[100%] rounded-lg shadow-sm">
        <div className="p-4">
          <h2 className="text-center text-3xl font-bold my-4">Logowanie</h2>
        </div>

        <form>
          <div className="flex justify-center">
            <input type="text" placeholder="Email" className={Styles.input} />
          </div>

          <div className="flex justify-center">
            <input
              type="password"
              placeholder="Password"
              className={Styles.input}
            />
          </div>

          <div className="flex justify-end my-4 mx-8">
            <button
              type="submit"
              className="bg-purple-700 hover:bg-purple-950 text-white font-bold py-2 px-4 rounded-sm"
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
