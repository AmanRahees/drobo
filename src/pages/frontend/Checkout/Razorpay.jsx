import React, { useContext, useCallback } from "react";
import useRazorpay from "react-razorpay";
import useAxios from "../../../services/useAxios";
import RazorpayImage from "./../../../assets/imgs/Razorpay.png";
import DataContainer from "../../../contexts/DataContainer";

function RazorpayInstance(props) {
  const api = useAxios();
  const { userInfo, setCartCounter, setTotalAmount, setDiscountAmount } =
    useContext(DataContainer);
  const [Razorpay] = useRazorpay();
  //   const amountInRupees = props.grandTotal * 100;
  const handlePayment = useCallback(() => {
    const options = {
      key: "rzp_test_TlrAuozaMlVbXz",
      amount: 10000,
      currency: "INR",
      name: "drobo ecommerce",
      description: "Checkout Transaction",
      image: "https://example.com/your_logo",
      handler: (res) => {
        if (res.razorpay_payment_id) {
          const data = {
            address: props?.selectedAddress,
            paymentId: res.razorpay_payment_id,
            payment_method: "Razorpay",
          };
          api
            .post("checkout/place-order", data)
            .then((response) => {
              setCartCounter(0);
              setTotalAmount(0);
              setDiscountAmount(0);
              props?.setResponseData(response.data);
              props?.setSuccessPage(true);
            })
            .catch((error) => {});
        }
      },
      prefill: {
        name: userInfo?.username,
        email: userInfo?.email,
        contact: userInfo?.phone,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.open();
    // eslint-disable-next-line
  }, [Razorpay]);

  return (
    <button
      onClick={handlePayment}
      className="w-full flex justify-center items-center bg-sky-200 py-2 my-2"
    >
      <img src={RazorpayImage} alt="" className="w-[100px]" />
    </button>
  );
}

export default RazorpayInstance;
