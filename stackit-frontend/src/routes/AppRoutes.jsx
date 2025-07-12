// src/routes/AppRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import AskQuestion from "../pages/AskQuestion";
import QuestionDetail from "../pages/QuestionDetail";
import Login from "../pages/Login";
import Register from "../pages/Register";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/ask" element={<AskQuestion />} />
    <Route path="/questions/:id" element={<QuestionDetail />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Register />} />

    {/* <Route path="/" element={<QuestionsList />} /> */}

  </Routes>
);

export default AppRoutes;
