import React, { useContext } from "react";
import { HabitContext } from "../context/HabitContext";

const HabitCard = ({ habit }) => {
  const { completeHabit } = useContext(HabitContext);

  const handleComplete = () => {
    if (!habit.completed) {
      completeHabit(habit.id, habit.xpReward);
    }
  };

  return (
    <div className={`habit-card ${habit.completed ? "completed" : ""}`}>
      <span>{habit.name}</span>
      <button onClick={handleComplete}>
        {habit.completed ? "Done ✅" : "Complete"}
      </button>
    </div>
  );
};

export default HabitCard;
