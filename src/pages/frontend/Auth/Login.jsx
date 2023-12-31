import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import "./auth.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
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
            fillRule="#1f282d"
            clipRule="evenodd"
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
        <form action="">
          <div className="relative mb-3">
            <label className="block mb-1 text-gray-700">Email</label>
            <input type="text" />
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
