import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { v4 as uuidv4 } from "uuid";

export const QuizContext = createContext();

export default function QuizContextProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  function createUser(name) {
    const id = uuidv4();
    setCurrentUser({ id: id, userName: name, score: 0 });
  }
  useEffect(() => {
    if (currentUser) {
      setUsers((prev) => [...prev, currentUser]);
    }
  }, [currentUser]);
  return (
    <>
      <QuizContext.Provider value={{ users, createUser ,setSelectedCategory}}>
        {children}
      </QuizContext.Provider>
    </>
  );
}
