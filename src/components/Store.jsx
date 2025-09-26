// src/components/Store.jsx
import React, { useContext, useState } from "react";
import { HabitContext } from "../context/HabitContext";

const initialItems = [
  { id: 1, name: "Avatar Skin", cost: 50 },
  { id: 2, name: "New Theme", cost: 100 },
  { id: 3, name: "Badge Pack", cost: 75 },
];

export default function Store() {
  const { player, setPlayer } = useContext(HabitContext);
  const [items, setItems] = useState(initialItems); // ✅ make items dynamic

  const applyItemEffect = (item) => {
  switch (item.name) {
    case "Avatar Skin":
      setPlayer((prev) => ({ ...prev, avatar: "/images/skin1.png" }));
      break;
    case "New Theme":
      setPlayer((prev) => ({ ...prev, theme: "dark" }));
      break;
    case "Badge Pack":
      setPlayer((prev) => ({
        ...prev,
        badges: [...prev.badges, "⭐", "💎", "🏆"], // full badge set
      }));
      break;
    default:
      break;
  }
};


  const buyItem = (item) => {
    if (player.coins >= item.cost) {
      if (player.inventory.some((i) => i.id === item.id)) {
        alert(`You already own ${item.name}!`);
        return;
      }

      // ✅ Deduct coins + add to inventory
      setPlayer((prev) => ({
        ...prev,
        coins: prev.coins - item.cost,
        inventory: [...prev.inventory, item],
      }));

      // ✅ Apply effect (skin, theme, badge)
      applyItemEffect(item);

      // ✅ Remove item from store list
      setItems((prev) => prev.filter((i) => i.id !== item.id));

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
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item.id} className="store-item">
              <span>{item.name}</span>
              <span>{item.cost} 🪙</span>
              <button className="btn" onClick={() => buyItem(item)}>Buy</button>
            </div>
          ))
        ) : (
          <p>🎉 All items purchased!</p>
        )}
      </div>

      <div className="inventory">
        <h4>Your Items:</h4>
        {player.inventory && player.inventory.length > 0 ? (
          <ul>
            {player.inventory.map((item, idx) => (
              <li key={idx}>{item.name}</li>
            ))}
          </ul>
        ) : (
          <p>No items purchased yet.</p>
        )}
      </div>
    </div>
  );
}
