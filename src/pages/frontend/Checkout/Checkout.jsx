import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import DataContainer from "../../../contexts/DataContainer";
import useAxios from "../../../services/useAxios";
import Struct from "../../../components/frontend/Struct/Struct";
import "./checkout.css";
import { apiUrl } from "../../../services/constants";

function Checkout() {
  const api = useAxios();
  const { totalAmount } = useContext(DataContainer);
  const [addresses, setAddresses] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState();
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
        setCartData(response.data);
      })
      .catch((error) => {});
    // eslint-disable-next-line
  }, []);
  const handlePlaceOrder = () => {
    console.log(selectedAddress);
  };
  return (
    <Struct>
      <div className="cart-container">
        <div className="cart-wrapper">
          <div className="cart_d1">
            <div className="w-full">
              <h1 className="text-primary-color cartH md:mb-3">
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
                      <td className="w-1/3 py-1">
                        <div className="flex gap-1">
                          <img
                            src={apiUrl + cartItem.cart_product.image}
                            alt=""
                            className="w-16"
                          />
                          <span className="text-left">
                            {cartItem?.cart_product.product.product_name}
                          </span>
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
                <span className="text-gray-200">${totalAmount}</span>
              </div>
              <div className="flex justify-between my-3">
                <span className="text-md">DISCOUNT</span>
                <span className="text-gray-200">-</span>
              </div>
            </div>
            <hr />
            <div className="my-3">
              <div className="flex justify-between">
                <span className="text-md">TOTAL</span>
                <span className="text-gray-200">$328974</span>
              </div>
              <button
                onClick={handlePlaceOrder}
                className="w-full bg-teal-600 py-2 my-2"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </Struct>
  );
}

export default Checkout;
