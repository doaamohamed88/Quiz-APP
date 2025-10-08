import React, { useContext, useEffect, useState } from "react";
import { Progress } from "flowbite-react";
import { QuizContext } from "../store/QuizContext";
import data from "../questions.js";
import { ScoreModal } from "../components/ScoreModal.jsx";

export default function QuizPage() {
  const totalQuestions = 10;
  const [currentIndex, setCurrentIndex] = useState(0); // صفر-based index
  const [timeLeft, setTimeLeft] = useState(20);
  const [randomQuestions, setRandomQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const { selectedCategory, addScoreToUser } = useContext(QuizContext);

  const currentQuestion = randomQuestions[currentIndex];
  const progress = ((currentIndex + 1) / totalQuestions) * 100; // للمستخدم 1..10

  // 🔀 دالة لاختيار أسئلة عشوائية بدون تكرار
function getRandomQuestions(categoryQuestions, total) {
  const result = [];
  const usedIds = new Set(); // لتجنب التكرار

  while (result.length < total && usedIds.size < categoryQuestions.length) {
    const idx = Math.floor(Math.random() * categoryQuestions.length);
    const question = categoryQuestions[idx];

    if (!usedIds.has(question.id)) {
      result.push(question);
      usedIds.add(question.id);
    }
  }

  return result;
}

  // 🎯 تحميل الأسئلة عند اختيار الفئة
  useEffect(() => {
    if (!selectedCategory) return;

    const categoryObj = data.find((obj) => obj[selectedCategory]);
    if (!categoryObj) return;

    const categoryQuestions = categoryObj[selectedCategory];
    if (!categoryQuestions || categoryQuestions.length === 0) return;

    const questionsToUse = getRandomQuestions(categoryQuestions, totalQuestions);

    setRandomQuestions(questionsToUse);
    setCurrentIndex(0);
    setScore(0);
    setTimeLeft(20);
    setSelectedAnswer(null);
    setOpenModal(false);
  }, [selectedCategory]);

  // ⏱ المؤقت
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

  // ✅ الانتقال للسؤال التالي
  const handleNextQuestion = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
      setTimeLeft(20);
      setSelectedAnswer(null);
    } else {
      setOpenModal(true);
    }
  };

  // ✅ التحقق من الإجابة
  const checkAnswer = (questionId, answer) => {
    const question = randomQuestions.find((q) => q.id === questionId);
    if (!question) return;

    setSelectedAnswer(answer);

    if (answer.trim() === question.answer.trim()) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      handleNextQuestion();
    }, 400);
  };

  // 🏁 تحديث نتيجة المستخدم عند فتح المودال
  useEffect(() => {
    if (openModal) {
      addScoreToUser(score);
    }
  }, [openModal]);

  // 🔄 إعادة اللعبة
  const startNewGame = () => {
    if (!selectedCategory) return;

    const categoryObj = data.find((obj) => obj[selectedCategory]);
    if (!categoryObj) return;

    const categoryQuestions = categoryObj[selectedCategory];
    if (!categoryQuestions || categoryQuestions.length === 0) return;

    const questionsToUse = getRandomQuestions(categoryQuestions, totalQuestions);

    setRandomQuestions(questionsToUse);
    setCurrentIndex(0);
    setScore(0);
    setTimeLeft(20);
    setSelectedAnswer(null);
    setOpenModal(false);
  };

  return (
    <>
      <div className="w-[100vw] flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center w-full max-w-[90%] md:max-w-md lg:max-w-lg bg-gray-900/80 text-white p-4 sm:p-6 md:p-8 rounded-2xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-6 drop-shadow-md">
            السؤال رقم {currentIndex + 1} / {totalQuestions}
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
                    className={`p-3 rounded-xl cursor-pointer transition w-full text-center ${
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
            disabled={currentIndex >= totalQuestions - 1}
            className={`mt-10 px-10 py-4 rounded-2xl text-lg font-semibold shadow-md transition-all duration-300 ${
              currentIndex >= totalQuestions - 1
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-yellow-400 hover:bg-yellow-300 text-black hover:scale-105"
            }`}
          >
            التالي
          </button>
        </div>
      </div>

      {openModal && <ScoreModal score={score} startNewGame={startNewGame} />}
    </>
  );
}
