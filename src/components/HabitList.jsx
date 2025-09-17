// src/components/HabitList.jsx
import React, { useContext } from "react";
import { HabitContext } from "../context/HabitContext";
import HabitCard from "./HabitCard";

const HabitList = () => {
  const { habits } = useContext(HabitContext);

  return (
    <div className="habit-group">
      <h3>Active Habits</h3>
      {habits.length === 0 ? (
        <p className="no-habits">No active habits. Add one!</p>
      ) : (
        <div className="habit-list">
          {habits.map((habit) => (
            <HabitCard key={habit.id} habit={habit} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HabitList;
