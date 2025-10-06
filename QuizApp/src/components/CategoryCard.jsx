import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../store/QuizContext";

export default function CategoryCard({ src, title }) {
  const navigate = useNavigate();
  const { setSelectedCategory } = useContext(QuizContext);
  function handleNavigate() {
    setSelectedCategory(title);
    navigate("/quiz");
  }

  return (
    <div
      onClick={handleNavigate}
      className="relative group bg-gray-800/60 border border-gray-700 rounded-2xl shadow-lg overflow-hidden hover:scale-105 hover:border-yellow-400 transition-all duration-300 cursor-pointer"
    >
      <img
        src={src}
        alt={title}
        className="w-full h-52 object-cover opacity-80 group-hover:opacity-100 transition-all duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-90 group-hover:opacity-100 transition-all duration-300"></div>
      <h2 className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xl font-bold text-yellow-400 group-hover:text-yellow-300 transition">
        {title}
      </h2>
    </div>
  );
}
