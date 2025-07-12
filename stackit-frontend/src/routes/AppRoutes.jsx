// src/routes/AppRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import AskQuestion from "../pages/AskQuestion";
import QuestionDetail from "../pages/QuestionDetail";
import Login from "../pages/Login";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/ask" element={<AskQuestion />} />
    <Route path="/question/:id" element={<QuestionDetail />} />
    <Route path="/login" element={<Login />} />
  </Routes>
);

export default AppRoutes;
