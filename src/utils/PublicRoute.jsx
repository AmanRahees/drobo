import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

export const PublicRoute = () => {
  let { userData } = useContext(AuthContext);
  return !userData ? <Outlet /> : <Navigate to="/" />;
};

export const AuthRoute = () => {
  let { userData } = useContext(AuthContext);
  return userData ? <Outlet /> : <Navigate to="/login" />;
};
