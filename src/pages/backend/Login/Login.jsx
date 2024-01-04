import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthContext from "../../../contexts/AuthContext";
import {
  faEye,
  faEyeSlash,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import "./login.css";

function AdminLogin() {
  const { AdminLogin: adminLogin } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const hanldeInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    adminLogin(formData.email, formData.password);
  };
  return (
    <div className="pl-authBox">
      <div className="pl-authForm">
        <h1>drobo.</h1>
        <form onSubmit={handleFormSubmit}>
          <div className="">
            <label className="block">Email</label>
            <input
              type="email"
              name="email"
              onChange={hanldeInputChange}
              value={formData.email}
              required
            />
          </div>
          <div className="relative">
            <label className="block">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={hanldeInputChange}
                value={formData.password}
                required
              />
              <FontAwesomeIcon
                onClick={() => setShowPassword(!showPassword)}
                className="plPwdEye"
                icon={showPassword ? faEyeSlash : faEye}
              />
            </div>
          </div>
          <div className="mt-4">
            <button className="w-full py-2 text-white bg-sub-color rounded">
              Login
            </button>
            <span className="block text-center text-red-600 mt-2">
              <FontAwesomeIcon icon={faInfoCircle} /> Authorized Administrators
              Only!
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
