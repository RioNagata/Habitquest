import React, { useContext } from "react";
import { HabitContext } from "../context/HabitContext";
import HabitCard from "./HabitCard";

const HabitList = () => {
  const { habits } = useContext(HabitContext);

  if (habits.length === 0) return <p>No habits yet. Add one!</p>;

  return (
    <div className="habit-list">
      {habits.map((habit) => (
        <HabitCard key={habit.id} habit={habit} />
      ))}
    </div>
  );
};

export default HabitList;
