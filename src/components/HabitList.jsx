import React, { useContext } from "react";
import { HabitContext } from "../context/HabitContext";
import HabitCard from "./HabitCard";

const HabitList = () => {
  const { habits } = useContext(HabitContext);

  if (habits.length === 0) return <p>No habits yet. Add one!</p>;

  const groups = ["daily", "weekly", "monthly", "yearly"];

  return (
    <div className="habit-list">
      {groups.map((group) => {
        const filtered = habits.filter((h) => h.frequency === group);
        if (filtered.length === 0) return null;

        return (
          <div key={group} className="habit-group">
            <h3>{group.charAt(0).toUpperCase() + group.slice(1)} Habits</h3>
            {filtered.map((habit) => (
              <HabitCard key={habit.id} habit={habit} />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default HabitList;
