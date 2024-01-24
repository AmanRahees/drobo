import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import useAxios from "../../../services/useAxios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CouponBox(props) {
  const api = useAxios();
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleInputChange = (e) => {
    let value = e.target.value.toUpperCase();
    setCode(value);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (code.length >= 6 && code.length <= 10) {
      api
        .post("profile/coupon", { code: code })
        .then((response) => {
          if (response.status === 201 || response.status === 200) {
            props.setActiveCoupon(response.data);
            props.setDiscountAmount(
              Math.round(
                (response.data.coupon.coupon_value / 100) * props.totalAmount
              )
            );
            toast.success("Coupon Activated!");
          } else if (response.status === 204) {
            toast.error("Coupon Expired!");
          } else if (response.status === 226) {
            toast.error("Coupon Already Used!");
          }
          setIsSubmitting(false);
        })
        .catch((error) => {
          toast.error("Invalid Coupon");
          setIsSubmitting(false);
        });
    } else {
      toast.error("Invalid Coupon Code!");
      setIsSubmitting(false);
    }
  };
  return (
    <form onSubmit={handleFormSubmit} className="flex my-2">
      <input
        type="text"
        value={code}
        onChange={handleInputChange}
        className="w-full outline-none text-gray-700 p-2"
        maxLength={10}
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-teal-600 py-2 px-4 w-[100px]"
      >
        {isSubmitting ? (
          <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
        ) : (
          "Apply"
        )}
      </button>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
    </form>
  );
}

export default CouponBox;
