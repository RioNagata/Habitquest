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
      <div>
        <strong>{habit.name}</strong>
        <p className="habit-frequency">({habit.frequency})</p>
      </div>
      <button onClick={handleComplete}>
        {habit.completed ? "Done ✅" : "Complete"}
      </button>
    </div>
  );
};

export default HabitCard;
