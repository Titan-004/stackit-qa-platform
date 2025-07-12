import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-4 max-w-5xl mx-auto">
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
