import React, { useEffect, useState, createContext } from "react";
import { v4 as uuidv4 } from "uuid";

export const QuizContext = createContext();

export default function QuizContextProvider({ children }) {
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("quizUsers");
    return saved ? JSON.parse(saved) : [];
  });

  const [currentUser, setCurrentUser] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  function createUser(name) {
    const id = uuidv4();
    const newUser = { id, userName: name, scores: [] };
    setCurrentUser(newUser);
    setUsers((prev) => [...prev, newUser]);
  }

  function resetGameData() {
    localStorage.removeItem("quizUsers");
    setUsers([]);
    setCurrentUser(null);
  }

  function addScoreToUser(score) {
    if (!currentUser) return;

    const updatedUsers = users.map((user) =>
      user.id === currentUser.id
        ? {
            ...user,
            scores: [
              ...user.scores,
              { score, date: new Date().toLocaleString("ar-EG") },
            ],
          }
        : user
    );

    setUsers(updatedUsers);

    const updatedCurrent = updatedUsers.find((u) => u.id === currentUser.id);
    setCurrentUser(updatedCurrent);
  }

  useEffect(() => {
    localStorage.setItem("quizUsers", JSON.stringify(users));
  }, [users]);

  return (
    <QuizContext.Provider
      value={{
        users,
        createUser,
        addScoreToUser,
        currentUser,
        selectedCategory,
        setSelectedCategory,
        resetGameData,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}
