import React, { useContext, useState } from "react";
import { QuizContext } from "../store/QuizContext";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const { createUser } = useContext(QuizContext);
  const [name, setName] = useState("");
  const navigate= useNavigate();
  function handleStart() {
    if (name.trim()) {
      createUser(name);
      setName("");
      navigate("/category")
    }
  }
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="p-6 w-full lg:w-[600px] bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl flex flex-col items-center space-y-5 animate-fadeIn">
        <h1 className="text-3xl font-bold text-center text-yellow-400 drop-shadow-lg">
          أدّها ولا لأ؟ 🤔
        </h1>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="اكتب اسمك هنا ✍️"
          className="rounded-md p-3 w-3/4 text-center text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
        />

        <button
          className="bg-yellow-400 text-gray-900 font-semibold px-6 py-2 rounded-md shadow-md hover:bg-yellow-300 hover:scale-105 transition-all duration-300"
          onClick={() => handleStart(name)}
          
      
        >
          يلا بينا 🚀
        </button>
      </div>
    </div>
  );
}
