import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("stackitUser");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        const res = await fetch("/api/currentUser", {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
          localStorage.setItem("stackitUser", JSON.stringify(data));
        } else {
          setUser(null);
          localStorage.removeItem("stackitUser");
        }
      } catch {
        setUser(null);
        localStorage.removeItem("stackitUser");
      }
    }
    fetchCurrentUser();
  }, []);

  const login = async (username, password) => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      const data = await res.json(); 
      setUser(data);
      localStorage.setItem("stackitUser", JSON.stringify(data));
      return true;
    } else {
      const errorData = await res.json();
      throw new Error(errorData.message || "Login failed");
    }
  };

  const logout = async () => {
    await fetch("/api/logout", { method: "POST", credentials: "include" });
    setUser(null);
    localStorage.removeItem("stackitUser");
  };

  const register = async (username, password) => {
    const res = await fetch("http://localhost:8080/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Registration failed");
    }
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
