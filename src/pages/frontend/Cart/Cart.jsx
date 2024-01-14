import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../../contexts/AuthContext";
import useAxios from "../../../services/useAxios";
import { apiUrl } from "../../../services/constants";
import Struct from "../../../components/frontend/Struct/Struct";
import emptyCart from "../../../assets/imgs/empty-cart.png";
import "./cart.css";

function Cart() {
  const api = useAxios();
  const { userData } = useContext(AuthContext);
  const [cartData, setCartData] = useState([]);
  const getCartItems = () => {
    api
      .get("cart")
      .then((response) => {
        setCartData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (userData) {
      getCartItems();
    }
    // eslint-disable-next-line
  }, [userData]);
  const incrementQuantity = (id) => {
    const updatedCartData = cartData.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    api
      .put(`cart/${id}`, { action: "increment" })
      .then((response) => {
        setCartData(updatedCartData);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const decrementQuantity = (id) => {
    const updatedCartData = cartData.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity - 1 } : item
    );
    api
      .put(`cart/${id}`, { action: "decrement" })
      .then((response) => {
        setCartData(updatedCartData);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const removeCartItem = (id) => {
    const updatedCartData = cartData.filter((item) => item.id !== id);
    api
      .delete(`cart/${id}`)
      .then((response) => {
        setCartData(updatedCartData);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Struct>
      <div className="cart-container">
        <h1 className="text-primary-color cartH md:mb-3">Shopping Cart</h1>
        {cartData.length > 0 ? (
          <div className="cart-wrapper">
            <div className="cart_d1">
              <table className="cartTable">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cartData.map((cartItem, index) => (
                    <tr key={index}>
                      <td>
                        <div className="flex gap-5">
                          <img
                            src={apiUrl + cartItem.cart_product.image}
                            alt=""
                          />
                          <div className="my-auto">
                            <span className="block font-bold">
                              {cartItem.cart_product.product.product_name}
                            </span>
                            {cartItem.cart_product.product_attributes.COLOR &&
                              cartItem.cart_product.product_attributes
                                .STORAGE && (
                                <span className="block text-xs">
                                  (
                                  {
                                    cartItem.cart_product.product_attributes
                                      .COLOR
                                  }
                                  ,{" "}
                                  {
                                    cartItem.cart_product.product_attributes
                                      .STORAGE
                                  }
                                  )
                                </span>
                              )}
                            {cartItem.cart_product.product_attributes.COLOR &&
                              cartItem.cart_product.product_attributes.SIZE && (
                                <span className="block text-xs">
                                  (
                                  {
                                    cartItem.cart_product.product_attributes
                                      .COLOR
                                  }
                                  ,{" "}
                                  {
                                    cartItem.cart_product.product_attributes
                                      .SIZE
                                  }
                                  )
                                </span>
                              )}
                            {cartItem.cart_product.product_attributes.COLOR &&
                              !cartItem.cart_product.product_attributes.SIZE &&
                              !cartItem.cart_product.product_attributes
                                .STORAGE && (
                                <span className="block text-xs">
                                  (
                                  {
                                    cartItem.cart_product.product_attributes
                                      .COLOR
                                  }
                                  )
                                </span>
                              )}
                            {!cartItem.cart_product.product_attributes.COLOR &&
                              cartItem.cart_product.product_attributes.SIZE &&
                              !cartItem.cart_product.product_attributes
                                .STORAGE && (
                                <span className="block text-xs">
                                  (
                                  {
                                    cartItem.cart_product.product_attributes
                                      .SIZE
                                  }
                                  )
                                </span>
                              )}
                            {!cartItem.cart_product.product_attributes.COLOR &&
                              !cartItem.cart_product.product_attributes.SIZE &&
                              cartItem.cart_product.product_attributes
                                .STORAGE && (
                                <span className="block text-xs">
                                  (
                                  {
                                    cartItem.cart_product.product_attributes
                                      .STORAGE
                                  }
                                  )
                                </span>
                              )}
                          </div>
                        </div>
                      </td>
                      <td>₹{cartItem.cart_product.price}</td>
                      <td>
                        <div className="flex overflow-hidden rounded-lg w-max bg-slate-100">
                          <button
                            disabled={cartItem.quantity === 1}
                            onClick={() => decrementQuantity(cartItem.id)}
                            className="py-2 px-3"
                          >
                            -
                          </button>
                          <span className="py-2 px-3 w-8 text-center border-y border-slate-100">
                            {cartItem.quantity}
                          </span>
                          <button
                            disabled={
                              cartItem.quantity >= cartItem.cart_product.stock
                            }
                            onClick={() => incrementQuantity(cartItem.id)}
                            className="py-2 px-3"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>
                        ₹{cartItem.cart_product.price * cartItem.quantity}
                      </td>
                      <td>
                        <button
                          onClick={() => removeCartItem(cartItem.id)}
                          className="bg-slate-100 p-2 px-3 text-sm font-bold rounded-full"
                        >
                          &#128473;
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="sm_cartBlock">
                {cartData.map((cartItem, index) => (
                  <div key={index} className="sm_cartItem">
                    <div className="sm_cartItem_img">
                      <img src={apiUrl + cartItem.cart_product.image} alt="" />
                    </div>
                    <div className="sm_cartItem_content">
                      <span className="block capitalize">
                        {cartItem.cart_product.product.product_name}
                      </span>
                      <small className="block text-xs">(Red, 128 GB)</small>
                    </div>
                    <div className="sm_cartItemF">
                      <div className="flex justify-between items-center">
                        <div className="rounded-lg overflow-hidden bg-transparent">
                          <button
                            disabled={cartItem.quantity === 1}
                            onClick={() => decrementQuantity(cartItem.id)}
                            className="p-1 px-2 bg-gray-200 text-primary-color"
                          >
                            -
                          </button>
                          <span className="px-2">{cartItem.quantity}</span>
                          <button
                            disabled={
                              cartItem.quantity >= cartItem.cart_product.stock
                            }
                            onClick={() => incrementQuantity(cartItem.id)}
                            className="p-1 px-2 bg-gray-200 text-primary-color"
                          >
                            +
                          </button>
                        </div>
                        <span className="font-bold">
                          ₹{cartItem.cart_product.price}
                        </span>
                      </div>
                    </div>
                    <button className="absolute -right-1 text-center -top-1 z-10 bg-white text-slate-400 text-xs rounded-full w-5 h-5 border">
                      &#128473;
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="cart_d2">
              <p className="text-md md:text-xl mb-3">SUMMARY</p>
              <hr />
              <div className="my-3">
                <label className="block">Do you have a promo code?</label>
                <form className="flex my-2">
                  <input
                    type="text"
                    className="w-full outline-none text-gray-700 p-2"
                    maxLength={10}
                  />
                  <button type="button" className="bg-teal-600 py-2 px-4">
                    Apply
                  </button>
                </form>
              </div>
              <hr />
              <div className="my-3">
                <div className="flex justify-between">
                  <span className="text-md">SUBTOTAL</span>
                  <span className="text-gray-200">$328974</span>
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
                <button className="w-full bg-teal-600 py-2 my-2">
                  checkout &rarr;
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <div className="flex flex-col items-center">
              <img src={emptyCart} alt="" className="aspect-square w-1/2" />
              <p className="text-center text-lg font-bold text-primary-color">
                Your cart is empty!
              </p>
              <span className="block text-sm">Add items to it now.</span>
              <Link
                to="/"
                className="bg-primary-color text-white py-2 px-5 md:mt-5 rounded-md"
              >
                Shop Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </Struct>
  );
}

export default Cart;
