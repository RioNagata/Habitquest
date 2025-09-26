// src/context/ThemeContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

const defaultTheme = "light"; // fallback theme

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(defaultTheme);

  // Load theme from localStorage if available
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setTheme(saved);
  }, []);

  // Save theme changes to localStorage
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };

  const resetTheme = () => {
    setTheme(defaultTheme); // go back to default theme after hard reset
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme, resetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
