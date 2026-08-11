import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AppShell from "./components/AppShell.jsx";
import ProtectedRoute, { PublicOnlyRoute } from "./components/ProtectedRoute.jsx";
import CropHistory from "./pages/CropHistory.jsx";
import CropScanner from "./pages/CropScanner.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Treatments from "./pages/Treatments.jsx";
import VanaAI from "./pages/VanaAI.jsx";
import Weather from "./pages/Weather.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<PublicOnlyRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<AppShell />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/vana-ai" element={<VanaAI />} />
          <Route path="/scanner" element={<CropScanner />} />
          <Route path="/treatments" element={<Treatments />} />
          <Route path="/history" element={<CropHistory />} />
          <Route path="/weather" element={<Weather />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
