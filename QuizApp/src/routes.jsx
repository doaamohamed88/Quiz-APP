import { useRoutes } from "react-router-dom";
import Quiz from "./pages/QuizPage";
import Welcome from "./pages/Welcome";
import CategoryPage from "./pages/CategoryPage";
import LandingPage from "./pages/LandingPage";

const AppRoutes = () => {
  const routes = [
    {path:"/" ,element:<LandingPage />},

    {
      path: "welcom",
      element: <Welcome />,
    },
    {
      path: "quiz",
      element: <Quiz />,
    },
    {
        path:"category", element:<CategoryPage/>
    },
  ];
  return useRoutes(routes);
};
export default AppRoutes;
