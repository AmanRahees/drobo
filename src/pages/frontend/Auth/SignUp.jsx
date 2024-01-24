import React, { useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../../services/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import Verify from "./Verify";
import "./auth.css";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleInputchange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    axiosInstance
      .post("accounts/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      })
      .then((response) => {
        if (response.status === 201) {
          setStatus(true);
        } else {
          setError("Invalid Entry!");
        }
      })
      .catch((error) => {
        setIsSubmitting(false);
      });
  };
  if (status) {
    return <Verify email={formData.email} />;
  }
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
          SignUp
        </h1>
        <form onSubmit={handleFormSubmit}>
          <span className="block text-center text-red-500">{error}</span>
          <div className="relative mb-3">
            <label className="block mb-1 text-gray-700">Full Name</label>
            <input
              type="text"
              name="username"
              onChange={handleInputchange}
              value={formData.username}
            />
          </div>
          <div className="relative mb-3">
            <label className="block mb-1 text-gray-700">Email</label>
            <input
              type="text"
              name="email"
              onChange={handleInputchange}
              value={formData.email}
            />
          </div>
          <div className="relative mb-3">
            <label className="block mb-1 text-gray-700">Password</label>
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
              disabled={isSubmitting}
              className="w-full py-2 bg-primary-color text-white border border-gray-500"
            >
              {isSubmitting ? "Submitting..." : "Continue"}
            </button>
            <span className="block text-center mt-2">
              Don't have an account ?{" "}
              <Link className="text-green-800">SignUp</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
