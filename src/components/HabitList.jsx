// src/components/HabitList.jsx
import React, { useContext } from "react";
import { HabitContext } from "../context/HabitContext";
import HabitCard from "./HabitCard";

const HabitList = () => {
  const { habits } = useContext(HabitContext);

  return (
    <div>
      <h2>Active Habits</h2>
      {habits.length === 0 ? (
        <p>No active habits. Add one!</p>
      ) : (
        habits.map((habit) => <HabitCard key={habit.id} habit={habit} />)
      )}
    </div>
  );
};

export default HabitList;
