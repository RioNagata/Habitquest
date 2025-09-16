import React, { useState, useContext } from "react";
import { HabitContext } from "../context/HabitContext";

const HabitForm = () => {
  const { addHabit } = useContext(HabitContext);
  const [name, setName] = useState("");
  const [xpReward, setXpReward] = useState(10);
  const [frequency, setFrequency] = useState("daily");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;

    const newHabit = {
      id: Date.now(),
      name,
      frequency,
      completed: false,
      xpReward: Number(xpReward),
    };

    addHabit(newHabit);
    setName("");
    setXpReward(10);
    setFrequency("daily");
  };

  return (
    <form onSubmit={handleSubmit} className="habit-form">
      <input
        type="text"
        placeholder="New Habit"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select
        value={frequency}
        onChange={(e) => setFrequency(e.target.value)}
      >
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>
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
