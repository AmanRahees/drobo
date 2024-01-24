import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../contexts/AuthContext";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../../../services/axios";
import verify_img from "../../../assets/imgs/verify.png";
import "./auth.css";

function Verify({ email }) {
  const navigate = useNavigate();
  const { setAuthTokens, setUserData } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: email,
    otp: 0,
  });
  const handleInputchange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (formData.otp.length >= 1 && formData.otp.length <= 6) {
      setIsSubmitting(true);
      axiosInstance
        .post("accounts/verify", {
          email: formData.email,
          otp: formData.otp,
        })
        .then((response) => {
          if (response.status === 200) {
            let data = response.data;
            console.log(response.data);
            setAuthTokens(data);
            setUserData(jwtDecode(data.access));
            localStorage.setItem("authTokens", JSON.stringify(data));
            navigate("/");
          }
        })
        .catch((error) => {
          console.log(error);
          setError("Invalid OTP");
          setIsSubmitting(false);
        });
    } else {
      setError("OTP must be 6 digit");
    }
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
        <div className="flex flex-col justify-center items-center">
          <img src={verify_img} alt="" width={"80px"} />
          <p className="text-gray-700 my-2">Please Verify Account</p>
          <span className="text-gray-500 text-xs text-center">
            Enter the 6 digit code we sent to <br />{" "}
            <span className="font-bold text-gray-700">{formData.email}</span>
          </span>
        </div>
        <form onSubmit={handleFormSubmit}>
          <span className="block text-center text-red-500">{error}</span>
          <input
            type="number"
            name="otp"
            className="my-3 text-center"
            required
            onChange={handleInputchange}
            value={formData.otp !== 0 && formData.otp}
          />
          <div className="relative">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 bg-primary-color text-white border border-gray-500"
            >
              {isSubmitting ? "Submitting..." : `Verify`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Verify;
