import React, { useContext, useEffect, useState } from "react";
import { Progress } from "flowbite-react";
import { QuizContext } from "../store/QuizContext";
import data from "../questions.js";
import { ScoreModal } from "../components/ScoreModal.jsx";

export default function QuizPage() {
  const totalQuestions = 10;
  const [currentIndex, setCurrentIndex] = useState(1);
  const [timeLeft, setTimeLeft] = useState(20);
  const [randomQuestions, setRandomQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const { selectedCategory } = useContext(QuizContext);
  const [openModal, setOpenModal] = useState(false);

  const progress = (currentIndex / totalQuestions) * 100;

  // 🔀 Shuffle helper
  function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  useEffect(() => {
    const categoryObj = data.find((obj) => obj[selectedCategory]);
    if (categoryObj) {
      const categoryQuestions = categoryObj[selectedCategory];
      const shuffled = shuffleArray(categoryQuestions);
      setRandomQuestions(shuffled.slice(0, totalQuestions));
    }
  }, [selectedCategory]);

  const currentQuestion = randomQuestions[currentIndex - 1];

  // ⏱ Timer
  useEffect(() => {
    if (openModal) return; 

    const timerId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerId);
          handleNextQuestion(); 
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [currentIndex, openModal]);

  // ✅ Move to next question
  function handleNextQuestion() {
    if (currentIndex < totalQuestions) {
      setCurrentIndex((prev) => prev + 1);
      setTimeLeft(20);
      setSelectedAnswer(null);
    } else {
      setOpenModal(true);
    }
  }

  // ✅ Check answer
  function checkAnswer(questionId, answer) {
    const question = randomQuestions.find((q) => q.id === questionId);
    setSelectedAnswer(answer);

    if (answer.trim() === question.answer.trim()) {
      setScore((prev) => prev + 1);
    }

    // delay before moving to next question
    setTimeout(() => {
      handleNextQuestion();
    }, 400);
  }

  useEffect(() => {
    if (currentIndex > totalQuestions) {
      setOpenModal(true);
    }
  }, [currentIndex]);

  return (
    <>
      <div className="flex flex-col items-center justify-center w-[600px] bg-gray-900/80 text-white p-6 rounded-2xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-6 drop-shadow-md">
          السؤال رقم {currentIndex} / {totalQuestions}
        </h1>

        <div className="flex sm:flex-row items-center justify-between w-full sm:w-2/3 gap-6">
          <div className="w-full sm:w-3/4 bg-gray-700 rounded-2xl shadow-inner">
            <Progress progress={progress} size="lg" color="yellow" labelProgress />
          </div>

          <div
            className={`flex items-center justify-center text-3xl font-bold w-20 h-20 border-4 rounded-full shadow-lg transition-all duration-500 ${
              timeLeft <= 5
                ? "border-red-400 text-red-400 animate-pulse"
                : timeLeft <= 10
                ? "border-yellow-400 text-yellow-400 animate-pulse"
                : "border-green-400 text-green-400"
            }`}
          >
            {timeLeft}
          </div>
        </div>

        {currentQuestion && (
          <div className="flex flex-col gap-2 mt-10 w-full">
            <p className="text-lg sm:text-xl text-gray-200 font-medium text-center">
              {currentQuestion.question}
            </p>
            <div className="flex flex-col gap-2 mt-3 w-full">
              {currentQuestion.options.map((option, i) => (
                <p
                  key={i}
                  onClick={() => checkAnswer(currentQuestion.id, option)}
                  className={`p-3 rounded-xl cursor-pointer transition w-full 
                    ${
                      selectedAnswer === option
                        ? option === currentQuestion.answer
                          ? "bg-green-500"
                          : "bg-red-500"
                        : "bg-gray-800/40 hover:bg-gray-700"
                    }`}
                >
                  {option}
                </p>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={handleNextQuestion}
          disabled={currentIndex >= totalQuestions}
          className={`mt-10 px-10 py-4 rounded-2xl text-lg font-semibold shadow-md transition-all duration-300 ${
            currentIndex >= totalQuestions
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-yellow-400 hover:bg-yellow-300 text-black hover:scale-105"
          }`}
        >
          التالي
        </button>
      </div>

      {openModal && <ScoreModal score={score} />}
    </>
  );
}
