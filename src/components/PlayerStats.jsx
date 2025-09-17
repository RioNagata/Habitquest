import React, { useContext } from "react";
import { HabitContext } from "../context/HabitContext";

const PlayerStats = () => {
  const { player } = useContext(HabitContext); // player contains xp and level

  return (
    <div className="player-stats">
      <h2>Level {player.level}</h2>
      <p>XP: {player.xp}</p>
    </div>
  );
};

export default PlayerStats;
