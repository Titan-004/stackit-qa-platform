import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Notifications from "./Notifications"; // make sure this exists

const Navbar = () => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  return (
    <nav className="bg-fuchsia-800 text-white p-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-xl">
        StackIt
      </Link>

      <div className="flex items-center gap-6">
        {/* Links */}
        <div>
          <Link to="/ask" className="mr-4 hover:underline">
            Ask
          </Link>
          <Link to="/login" className="hover:underline">
            Login
          </Link>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          className="text-white focus:outline-none"
          title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? (
            // Moon icon (dark mode)
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"
              />
            </svg>
          ) : (
            // Sun icon (light mode)
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v1m0 16v1m8.66-9H21m-16 0H3m15.36 6.36l.71.71m-12.02-12.02l.7.7m12.02 0l-.7.7m-12.02 12.02l-.7.7M12 7a5 5 0 100 10 5 5 0 000-10z"
              />
            </svg>
          )}
        </button>

        {/* Notifications */}
        <Notifications />
      </div>
    </nav>
  );
};

export default Navbar;
