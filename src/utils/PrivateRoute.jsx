import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

export const AdminPrivateRoute = () => {
  let { userData } = useContext(AuthContext);
  if (userData && userData.role === "admin") {
    return <Outlet />;
  } else {
    return <Navigate to="/admin/login" />;
  }
};

export const AdminAuthRoute = () => {
  let { userData } = useContext(AuthContext);
  if (!userData || userData.role !== "admin") {
    return <Outlet />;
  } else if (userData && userData.role === "admin") {
    return <Navigate to="/admin" />;
  }
};
