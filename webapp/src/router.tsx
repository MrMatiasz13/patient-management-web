import { createBrowserRouter } from "react-router";
import AuthScreen from "./pages/AuthScreen";
import HomeScreen from "./pages/HomeScreen";
import { RequireAuth } from "./utils/helpers/RequireAuth";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireAuth>
        <HomeScreen />
      </RequireAuth>
    ),
    errorElement: <AuthScreen />,
  },

  {
    path: "/login",
    element: <AuthScreen />,
  },
]);

export default router;
