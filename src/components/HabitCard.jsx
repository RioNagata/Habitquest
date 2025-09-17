// src/components/HabitCard.jsx
import React, { useContext, useEffect, useState } from "react";
import { HabitContext } from "../context/HabitContext";

const HabitCard = ({ habit }) => {
  const { completeHabit, failHabit } = useContext(HabitContext);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const updateTimer = () => {
      const now = Date.now();
      const diff = habit.due - now;

      if (diff <= 0) {
        setTimeLeft("Expired");
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    };

    updateTimer(); // run once
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [habit.due]);

  return (
    <div style={{ border: "1px solid #ccc", margin: "8px", padding: "8px" }}>
      <h3>{habit.name}</h3>
      <p>Points: {habit.points}</p>
      <p>Period: {habit.period}</p>
      <p>Time left: {timeLeft}</p>
      <button onClick={() => completeHabit(habit.id)}>Complete</button>
      <button onClick={() => failHabit(habit.id)}>Not Completed</button>
    </div>
  );
};

export default HabitCard;
