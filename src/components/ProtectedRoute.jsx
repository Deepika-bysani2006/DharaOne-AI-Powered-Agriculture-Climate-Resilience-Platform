import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import Logo from "./Logo.jsx";

function LoadingScreen() {
  return (
    <main className="loading-screen">
      <Logo />
      <p>Preparing DharaOne...</p>
    </main>
  );
}

export default function ProtectedRoute() {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingScreen />;
  if (!currentUser) return <Navigate to="/login" replace state={{ from: location }} />;

  return <Outlet />;
}

export function PublicOnlyRoute() {
  const { currentUser, loading } = useAuth();

  if (loading) return <LoadingScreen />;
  if (currentUser) return <Navigate to="/dashboard" replace />;

  return <Outlet />;
}
