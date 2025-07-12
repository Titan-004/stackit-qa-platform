import React, { useState, useEffect, useRef } from "react";

const mockNotifications = [
  {
    id: 1,
    text: "Alice answered your question.",
    isRead: false,
  },
  {
    id: 2,
    text: "Bob mentioned you in an answer.",
    isRead: false,
  },
  {
    id: 3,
    text: "New comment on your answer.",
    isRead: true,
  },
];

export default function Notifications() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);

  const toggleDropdown = () => setIsOpen((open) => !open);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, isRead: true }))
      );
    }
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="relative focus:outline-none"
        aria-label="Notifications"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-700 hover:text-gray-900"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-5-5.917V5a2 2 0 10-4 0v.083A6 6 0 004 11v3.159c0 .538-.214 1.055-.595 1.436L2 17h5m5 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-auto bg-white border border-gray-300 rounded shadow-lg z-50">
          <ul>
            {notifications.length === 0 && (
              <li className="p-4 text-gray-500">No notifications</li>
            )}
            {notifications.map((note) => (
              <li
                key={note.id}
                className={`p-3 border-b border-gray-200 ${
                  note.isRead ? "bg-fuchsia-800" : "bg-gray-100 font-semibold"
                }`}
              >
                {note.text}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
