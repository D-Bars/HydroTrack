import type { ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useUserStore from "../store/userStore";

interface ProtectedRouteProps {
  children: ReactElement;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isRegistered = useUserStore((state) => state.isRegistered);
  const location = useLocation();

  if (!isRegistered) {
    return <Navigate to="/register" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;