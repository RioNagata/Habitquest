import React, { createContext, useState, useEffect } from "react";

export const HabitContext = createContext();

export const HabitProvider = ({ children }) => {
  const [habits, setHabits] = useState([]);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);

  // Example: add habit
  const addHabit = (habit) => {
    setHabits([...habits, habit]);
  };

  // Example: mark habit complete
  const completeHabit = (id, rewardXP) => {
    setHabits(
      habits.map((h) => (h.id === id ? { ...h, completed: true } : h))
    );
    setXp(xp + rewardXP);
  };

  // Level up logic
  useEffect(() => {
    if (xp >= level * 100) setLevel(level + 1);
  }, [xp, level]);

  return (
    <HabitContext.Provider
      value={{ habits, addHabit, completeHabit, xp, level }}
    >
      {children}
    </HabitContext.Provider>
  );
};
