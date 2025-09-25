// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("users");
    return saved ? JSON.parse(saved) : [];
  });

  const login = (username, password) => {
    const existing = users.find(
      (u) => u.username === username && u.password === password
    );
    if (existing) {
      setUser(existing);
      localStorage.setItem("user", JSON.stringify(existing));
      return true;
    }
    return false;
  };

  const register = (username, password) => {
    if (users.some((u) => u.username === username)) {
      return false; // username taken
    }
    const newUser = { id: Date.now(), username, password };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // ✅ Update username
  const updateUsername = (newUsername) => {
    if (!user) return false;
    if (users.some((u) => u.username === newUsername)) {
      return false; // username already exists
    }
    const updatedUser = { ...user, username: newUsername };
    const updatedUsers = users.map((u) =>
      u.id === user.id ? updatedUser : u
    );

    setUser(updatedUser);
    setUsers(updatedUsers);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    return true;
  };

  // ✅ Update password
  const updatePassword = (oldPassword, newPassword) => {
    if (!user || user.password !== oldPassword) return false;

    const updatedUser = { ...user, password: newPassword };
    const updatedUsers = users.map((u) =>
      u.id === user.id ? updatedUser : u
    );

    setUser(updatedUser);
    setUsers(updatedUsers);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        login,
        register,
        logout,
        updateUsername,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
