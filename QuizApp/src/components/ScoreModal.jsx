import { useNavigate } from "react-router-dom";
import win from "../assets/congrats.mp4";
import loser from "../assets/loser.jpg";
import { useContext } from "react";
import { QuizContext } from "../store/QuizContext";

export function ScoreModal({ score }) {
  const navigate = useNavigate();
  const { currentUser } = useContext(QuizContext);
  if (!currentUser) return null;


  return (
    <>
=      <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"></div>

=      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="bg-yellow-700 rounded-2xl shadow-2xl w-[90%] sm:w-[500px] text-white p-6 relative"
        >
          <h2 className="text-2xl font-bold text-center text-black mb-4">
            النتيجة: {score} / 10
          </h2>

          <div className="space-y-6 text-center">
            <p className="text-lg leading-relaxed text-black">
              {score === 10
                ? `💪👏😎  أدها وأدود يا ${currentUser.userName} `
                : `💀🤦‍♂️😩  مطلعتش أدهااا يا ${currentUser.userName}`}
            </p>

            <div className="flex justify-center">
              {score === 10 ? (
                <video
                  src={win}
                  autoPlay
                  loop
                  className="w-full rounded-xl shadow-2xl border border-black"
                />
              ) : (
                <img
                  src={loser}
                  alt="خسارة"
                  className="w-full rounded-xl shadow-2xl border border-black"
                />
              )}
            </div>
          </div>

        <div className="flex justify-center mt-6">
            <button
              onClick={() => navigate("/")}
              className="text-black font-bold bg-white hover:bg-gray-200 hover:scale-105 transition-all duration-300 rounded-xl px-8 py-3"
            >
              🔁 تلعب تاني؟
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
