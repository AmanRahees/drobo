import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import "./auth.css";

function Login() {
  const { UserLogin, error } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputchange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await UserLogin(formData.email, formData.password);
  };

  return (
    <div className="authBox_">
      <div className="absolute h-full -z-20 w-full bg-secondary-color">
        <svg
          className="absolute -z-10 top-0"
          preserveAspectRatio="none"
          viewBox="0 0 500 200"
        >
          <path
            d="M 0 50 C 150 150 300 0 500 80 L 500 0 L 0 0"
            fill="#1f282d"
          ></path>
        </svg>
      </div>
      <div className="authFormBox shadow-lg shadow-slate-500">
        <h1 className="text-primary-color relative">
          <Link to="/" title="Back">
            <FontAwesomeIcon
              className="text-sm absolute left-0"
              icon={faArrowLeft}
            />
          </Link>
          Login
        </h1>
        <form onSubmit={handleFormSubmit}>
          <span className="block text-center text-red-500">{error}</span>
          <div className="relative mb-3">
            <label className="block mb-1 text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleInputchange}
              value={formData.email}
            />
          </div>
          <div className="relative mb-3">
            <div className="flex justify-between items-center mb-1">
              <label className="text-gray-700">Password</label>
              <Link className="text-cyan-800 text-sm">Forgot Password?</Link>
            </div>
            <div className="relative">
              <input
                type={`${showPassword ? "text " : "password"}`}
                name="password"
                onChange={handleInputchange}
                value={formData.password}
              />
              <button
                className="absolute text-gray-700 top-1/2 right-2 -translate-y-1/2"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>
          <div className="relative">
            <button
              type="submit"
              className="w-full py-2 bg-primary-color text-white border border-gray-500"
            >
              Submit
            </button>
            <span className="block text-center mt-2">
              Don't have an account ?{" "}
              <Link to="/signup" className="text-green-800">
                SignUp
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
