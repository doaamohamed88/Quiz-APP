import React, { useContext } from "react";
import { QuizContext } from "../store/QuizContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function LandingPage() {
  const { users, resetGameData } = useContext(QuizContext);
  const navigate = useNavigate();

  return (
    <motion.div
      className="flex flex-col items-center min-h-screen bg-gray-900/80 text-white p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-yellow-400 drop-shadow-lg text-center">
        🎯 أدّها ولا لأ؟
      </h1>

      <p className="text-lg text-gray-300 mb-10 text-center max-w-md">
        جاوب على الأسئلة وشوف نتيجتك وسجل اللاعبين 👇
      </p>

      <div className=" rounded-2xl p-6 w-full max-w-4xl shadow-2xl border border-yellow-400/20 backdrop-blur-md">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-5 text-center drop-shadow-sm">
          🏆 سجل اللاعبين
        </h2>

        {users.length === 0 ? (
          <p className="text-center text-gray-400 py-10">لا يوجد لاعبين 😅</p>
        ) : (
          <table className="w-full text-center border-collapse text-sm sm:text-base">
            <thead>
              <tr className="bg-gray-900/60 text-yellow-300">
                <th className="py-3 px-2 border-b border-gray-700 rounded-tl-lg">اللاعب</th>
                <th className="py-3 px-2 border-b border-gray-700">النتائج</th>
                <th className="py-3 px-2 border-b border-gray-700 rounded-tr-lg">آخر تاريخ</th>
              </tr>
            </thead>
            <tbody>
              {users
                .slice()
                .reverse()
                .map((user) => {
                  const lastScore = user.scores?.[user.scores.length - 1];
                  const lastDate = lastScore?.date || "—";
                  const allScores = user.scores?.map((s) => s.score).join(", ") || "—";

                  return (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-gray-800/40 hover:bg-gray-800/70 transition-all duration-200 border-b border-gray-700"
                    >
                      <td className="py-3 px-2 font-semibold text-yellow-300">{user.userName}</td>
                      <td className="py-3 px-2 text-gray-300">{allScores}</td>
                      <td className="py-3 px-2 text-gray-400 text-sm">{lastDate}</td>
                    </motion.tr>
                  );
                })}
            </tbody>
          </table>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-10">
        <motion.button
          onClick={() => navigate("/welcom")}
          className="bg-yellow-400 text-gray-900 font-bold text-lg px-10 py-4 rounded-2xl shadow-xl hover:bg-yellow-300 hover:scale-105 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🎮 ابدأ لعبة جديدة
        </motion.button>

        <motion.button
          onClick={() => {
            if (window.confirm("هل أنت متأكد أنك تريد مسح كل البيانات؟ 😢")) {
              resetGameData();
            }
          }}
          className="bg-red-500 text-white font-bold text-lg px-10 py-4 rounded-2xl shadow-xl hover:bg-red-600 hover:scale-105 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🔄 إعادة تعيين اللعبة
        </motion.button>
      </div>

      <footer className="mt-12 text-sm text-gray-500">
        تم التطوير ❤️ باستخدام React و TailwindCSS
      </footer>
    </motion.div>
  );
}
