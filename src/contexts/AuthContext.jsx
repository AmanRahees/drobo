import React, { useState, useEffect, createContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { apiUrl } from "../services/constants";
import axiosInstance from "../services/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [userData, setUserData] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens"))
      : null
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const UserLogin = async (email, password) => {
    axiosInstance
      .post(`${apiUrl}/api/accounts/login`, {
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.status === 200) {
          let data = response.data;
          setAuthTokens(data);
          setUserData(jwtDecode(data.access));
          localStorage.setItem("authTokens", JSON.stringify(data));
          navigate("/");
        }
      })
      .catch((error) => {
        setError("Invalid Email or Password!");
      });
  };

  const AdminLogin = async (email, password) => {
    axiosInstance
      .post(`${apiUrl}/api/admin/login`, {
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.status === 200) {
          let data = response.data;
          setAuthTokens(data);
          setUserData(jwtDecode(data.access));
          localStorage.setItem("authTokens", JSON.stringify(data));
          navigate("/admin");
        }
      })
      .catch((error) => {
        setError(error.response.data.Error);
      });
  };

  const Logout = () => {
    setAuthTokens(null);
    setUserData(null);
    localStorage.removeItem("authTokens");
    // window.location.reload();
  };

  let refreshToken = useCallback(async () => {
    await axiosInstance
      .post("accounts/token/refresh", {
        refresh: authTokens?.refresh,
      })
      .then((response) => {
        let data = response.data;
        if (response.status === 200) {
          setAuthTokens(data);
          setUserData(jwtDecode(data.access));
          localStorage.setItem("authTokens", JSON.stringify(data));
        } else {
          Logout();
        }
      })
      .catch((error) => {
        Logout();
      });
    if (loading) {
      setLoading(false);
    }
  }, [authTokens, loading]);

  useEffect(() => {
    let lifeTime = 1000 * 60 * 9;
    let interval = setInterval(() => {
      if (authTokens) {
        refreshToken();
        console.log("Refreshing...");
      }
    }, lifeTime);
    return () => clearInterval(interval);
  }, [authTokens, refreshToken]);

  let ContextData = {
    authTokens: authTokens,
    setAuthTokens: setAuthTokens,
    userData: userData,
    setUserData: setUserData,
    UserLogin: UserLogin,
    AdminLogin: AdminLogin,
    Logout: Logout,
    loading: loading,
    setLoading: setLoading,
    error: error,
  };
  return (
    <AuthContext.Provider value={ContextData}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
