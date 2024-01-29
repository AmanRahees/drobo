import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook } from "@fortawesome/free-solid-svg-icons";
import DataContainer from "../../../contexts/DataContainer";
import useAxios from "../../../services/useAxios";
import { apiUrl } from "../../../services/constants";
import Struct from "../../../components/frontend/Struct/Struct";
import Loader from "../../../components/Loader/Loader";
import OrderSuccessPage from "./Success";
import Razorpay from "./Razorpay";
import "./checkout.css";

function Checkout() {
  const api = useAxios();
  const navigate = useNavigate();
  const {
    totalAmount,
    discountAmount,
    setTotalAmount,
    setDiscountAmount,
    setCartCounter,
  } = useContext(DataContainer);
  const [addresses, setAddresses] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [responseData, setResponseData] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [successPage, setSuccessPage] = useState(false);
  useEffect(() => {
    api
      .get("profile/address")
      .then((response) => {
        setAddresses(response.data);
        setSelectedAddress(
          response.data.length > 0 ? response.data[0].id : null
        );
      })
      .catch((error) => {});
    api
      .get("cart")
      .then((response) => {
        if (response.data.length !== 0) {
          setCartData(response.data);
          setLoading(false);
        } else {
          navigate("/");
        }
      })
      .catch((error) => {});
    // eslint-disable-next-line
  }, []);
  const handlePlaceOrder = (payment_method) => {
    if (selectedAddress !== 0) {
      const data = {
        address: selectedAddress,
        payment_method: payment_method,
      };
      api
        .post("checkout/place-order", data)
        .then((response) => {
          setCartCounter(0);
          setTotalAmount(0);
          setDiscountAmount(0);
          setResponseData(response.data);
          setSuccessPage(true);
        })
        .catch((error) => {});
    }
  };
  if (loading) {
    return <Loader />;
  }
  if (successPage) {
    return <OrderSuccessPage responseData={responseData} />;
  }
  return (
    <Struct>
      <div className="cart-container">
        <div className="cart-wrapper">
          <div className="cart_d1">
            <div className="w-full">
              {addresses.length === 0 ? (
                <div className="flex justify-center items-center h-full py-5 my-2">
                  <div className="flex flex-col">
                    <FontAwesomeIcon
                      icon={faAddressBook}
                      className="text-[50px] md:text-[80px]"
                    />
                    <p className="font-bold my-2">No Addresses Found!</p>
                    <Link
                      to="/profile/add-address"
                      className="bg-primary-color text-white text-center py-2 rounded-md"
                    >
                      + Add Address
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="text-primary-color text-[20px] md:mb-3">
                    Select Address
                  </h1>
                  <div className="_cktAdds">
                    {addresses.map((address, index) => (
                      <div key={index} className="_cktAddsItem">
                        <input
                          type="radio"
                          name="addressOption"
                          onChange={() => setSelectedAddress(address.id)}
                          id={`addsOption${index}`}
                          checked={selectedAddress === address.id}
                        />
                        <label
                          htmlFor={`addsOption${index}`}
                          className="cursor-pointer"
                        >
                          <h1>{address.full_name}</h1>
                          <p className="font-bold">{address.phone}</p>
                          <p id="cktAddress">
                            <span
                              className={`text-xs p-1 ${
                                address.type === "Home"
                                  ? "bg-sky-600"
                                  : "bg-orange-600"
                              } text-white`}
                            >
                              {address.type}
                            </span>{" "}
                            {address.house_name}, {address.road_name},{" "}
                            {address.city}, {address.district}, {address.state}
                          </p>
                          <p className="font-bold">{address.pincode}</p>
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-start">
                    <Link
                      to="/profile/add-address"
                      className="bg-primary-color text-white px-5 py-2 rounded"
                    >
                      Add Address +
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="cart_d2">
            <p className="text-md md:text-xl mb-3">SUMMARY</p>
            <hr />
            <div className="my-3">
              <table className="w-full text-center">
                <thead className="text-teal-600 bg-cyan-950">
                  <tr>
                    <th className="py-1">Product</th>
                    <th className="py-1">Quantity</th>
                    <th className="py-1">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {cartData.map((cartItem, index) => (
                    <tr key={index} className="border-t border-gray-700">
                      <td className="w-full py-1">
                        <div className="flex items-center gap-1">
                          <img
                            src={apiUrl + cartItem.cart_product.image}
                            alt=""
                            className="w-16"
                          />
                          <small className="text-left text-ellipsis overflow-hidden line-clamp-2">
                            {cartItem?.cart_product.product.product_name}
                          </small>
                        </div>
                      </td>
                      <td className="py-1">{cartItem.quantity}x</td>
                      <td className="py-1 text-right">
                        ${cartItem.cart_product.price * cartItem.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <hr />
            <div className="my-3">
              <div className="flex justify-between">
                <span className="text-md">SUBTOTAL</span>
                <span className="text-gray-200">₹{totalAmount}</span>
              </div>
              <div className="flex justify-between my-3">
                <span className="text-md">DISCOUNT</span>
                <span className="text-gray-200">
                  {discountAmount > 0 ? `-₹${discountAmount}` : "-"}
                </span>
              </div>
            </div>
            <hr />
            <div className="my-3">
              <div className="flex justify-between">
                <span className="text-md">TOTAL</span>
                <span className="text-gray-200 font-bold">
                  ₹{totalAmount - discountAmount}
                </span>
              </div>
              <button
                onClick={() => handlePlaceOrder("Cash on Delivery")}
                className="w-full bg-teal-600 py-2 my-2"
              >
                Place Order
              </button>
              <Razorpay
                selectedAddress={selectedAddress}
                grandTotal={totalAmount - discountAmount}
                setResponseData={setResponseData}
                setSuccessPage={setSuccessPage}
              />
            </div>
          </div>
        </div>
      </div>
    </Struct>
  );
}

export default Checkout;
