import { createBrowserRouter } from "react-router";
import AuthScreen from "./pages/AuthScreen";
import HomeScreen from "./pages/HomeScreen";
import { RequireAuth } from "./utils/helpers/RequireAuth";
import PatientsScreen from "./pages/PatientsScreen";

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

  {
    path: "/patients",
    element: (
      // <RequireAuth>
      //   <PatientsScreen />
      // </RequireAuth>
      <PatientsScreen />
    ),
  },
]);

export default router;
