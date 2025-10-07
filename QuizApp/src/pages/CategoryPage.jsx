import React from "react";
import CategoryCard from "../components/CategoryCard";
import movies from "../assets/movies.png";
import animals from "../assets/animal.png";
import sports from "../assets/sport.png";

export default function CategoryPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] rounded-md p-12 bg-gray-900/80  text-white px-4">
      <h1 className="text-4xl font-bold mb-10 text-yellow-400 drop-shadow-md">
        اختار نوع الأسئلة 🎯
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
        <CategoryCard src={movies} title="أفلام" />
        <CategoryCard src={animals} title="حيوانات" />
        <CategoryCard src={sports} title="رياضة" />
      </div>
    </div>
  );
}
