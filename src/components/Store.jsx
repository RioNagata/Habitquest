// src/components/Store.jsx
import React, { useContext } from "react";
import { HabitContext } from "../context/HabitContext";

const items = [
  { id: 1, name: "Avatar Skin", cost: 50 },
  { id: 2, name: "New Theme", cost: 100 },
  { id: 3, name: "Badge Pack", cost: 75 },
];

export default function Store() {
  const { player, setPlayer } = useContext(HabitContext);

  // If setPlayer is not exposed, use a custom function in HabitContext like 'spendCoins'
  const buyItem = (item) => {
    if (player.coins >= item.cost) {
      // Update coins in context
      setPlayer({ ...player, coins: player.coins - item.cost });
      alert(`Purchased ${item.name}!`);
    } else {
      alert("Not enough coins!");
    }
  };

  return (
    <div className="store">
      <h3>Rewards Store 🛒</h3>
      <p>Coins: {player.coins} 🪙</p>
      <div className="store-items">
        {items.map((item) => (
          <div key={item.id} className="store-item">
            <span>{item.name}</span>
            <span>{item.cost} 🪙</span>
            <button className="btn" onClick={() => buyItem(item)}>Buy</button>
          </div>
        ))}
      </div>
    </div>
  );
}
