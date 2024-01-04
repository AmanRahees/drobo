import { useContext } from "react";
import axios from "axios";
import AuthContext from "../contexts/AuthContext";
import { jwtDecode } from "jwt-decode";
import { apiUrl } from "./constants";
import dayjs from "dayjs";

function useAxios() {
  const { authTokens, setUserData, setAuthTokens } = useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    headers: { Authorization: `Bearer ${authTokens?.access}` },
  });

  axiosInstance.interceptors.request.use(async (req) => {
    const user = jwtDecode(authTokens?.access);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    if (!isExpired) return req;

    const response = await axios.post(`${apiUrl}/api/accounts/token/refresh`, {
      refresh: authTokens.refresh,
    });

    localStorage.setItem("authTokens", JSON.stringify(response.data));

    setAuthTokens(response.data);
    setUserData(jwtDecode(response.data.access));

    req.headers.Authorization = `Bearer ${response.data.access}`;
    return req;
  });

  return axiosInstance;
}

export default useAxios;
