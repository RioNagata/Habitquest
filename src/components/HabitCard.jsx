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

    updateTimer(); // initial run
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [habit.due]);

  return (
    <div className={`habit-card ${habit.status ? habit.status : ""}`}>
      <div className="habit-info">
        <h3>{habit.name}</h3>
        <p className="habit-frequency">Points: {habit.points} | Period: {habit.period}</p>
        <p className="habit-timer">Time left: {timeLeft}</p>
      </div>
      <div className="habit-actions">
        <button className="btn" onClick={() => completeHabit(habit.id)}>
          Complete
        </button>
        <button className="btn btn-red" onClick={() => failHabit(habit.id)}>
          Not Completed
        </button>
      </div>
    </div>
  );
};

export default HabitCard;
