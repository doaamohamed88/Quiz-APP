import QuizPage from "./pages/QuizPage";
import QuizContextProvider from "./store/QuizContext";

function App() {
  return (
    <>
    <QuizContextProvider>

      <QuizPage />
    </QuizContextProvider>
    </>
  );
}

export default App;
