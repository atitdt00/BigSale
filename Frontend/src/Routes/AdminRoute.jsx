import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function AdminRoute() {
  const { loggedIn } = useAuth();

  if (!loggedIn) {
    return <Navigate to={"/"} replace />;
  }

  return <Outlet />;
}

export default AdminRoute;
