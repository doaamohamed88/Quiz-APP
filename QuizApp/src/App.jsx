import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import QuizContextProvider from "./store/QuizContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <QuizContextProvider>
          <AppRoutes />
        </QuizContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
