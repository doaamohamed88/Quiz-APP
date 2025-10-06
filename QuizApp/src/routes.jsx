import { useRoutes } from "react-router-dom";
import Quiz from "./pages/QuizPage";
import Welcome from "./pages/Welcome";
import ScorePage from "./pages/ScorePage";
import CategoryPage from "./pages/CategoryPage";

const AppRoutes = () => {
  const routes = [
    {
      path: "/",
      element: <Welcome />,
    },
    {
      path: "quiz",
      element: <Quiz />,
    },
    {
        path:"category", element:<CategoryPage/>
    },
    { path: "score", element: <ScorePage /> },
  ];
  return useRoutes(routes);
};
export default AppRoutes;
