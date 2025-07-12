// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-fuchsia-800 text-white p-4 flex justify-between">
    <Link to="/" className="font-bold text-xl">StackIt</Link>
    <div>
      <Link to="/ask" className="mr-4 hover:underline">Ask</Link>
      <Link to="/login" className="hover:underline">Login</Link>
    </div>
  </nav>
);

export default Navbar;
