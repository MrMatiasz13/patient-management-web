import { createBrowserRouter } from "react-router";
import AuthScreen from "./pages/AuthScreen";
import HomeScreen from "./pages/HomeScreen";
import { RequireAuth } from "./utils/helpers/components/RequireAuth";
import PatientsScreen from "./pages/PatientsScreen";
import KindergartenSheetScreen from "./pages/examination-sheets-pages/KindergartenSheetScreen";

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
      <RequireAuth>
        <PatientsScreen />
      </RequireAuth>
    ),
  },

  {
    path: "/patients/:id/kindergarten-sheet",
    element: (
      <RequireAuth>
        <KindergartenSheetScreen />
      </RequireAuth>
    ),
  },
]);

export default router;
