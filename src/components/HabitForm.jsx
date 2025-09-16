import React, { useState, useContext } from "react";
import { HabitContext } from "../context/HabitContext";

const HabitForm = () => {
  const { addHabit } = useContext(HabitContext);
  const [name, setName] = useState("");
  const [xpReward, setXpReward] = useState(10);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;

    const newHabit = {
      id: Date.now(),
      name,
      completed: false,
      xpReward: Number(xpReward),
    };

    addHabit(newHabit);
    setName("");
    setXpReward(10);
  };

  return (
    <form onSubmit={handleSubmit} className="habit-form">
      <input
        type="text"
        placeholder="New Habit"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        min="1"
        value={xpReward}
        onChange={(e) => setXpReward(e.target.value)}
      />
      <button type="submit">Add Habit</button>
    </form>
  );
};

export default HabitForm;
