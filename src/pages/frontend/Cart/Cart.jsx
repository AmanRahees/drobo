import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import DataContainer from "../../../contexts/DataContainer";
import useAxios from "../../../services/useAxios";
import { apiUrl } from "../../../services/constants";
import Struct from "../../../components/frontend/Struct/Struct";
import Loader from "../../../components/Loader/Loader";
import emptyCart from "../../../assets/imgs/empty-cart.png";
import CouponBox from "./CouponBox";
import "./cart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faTicket } from "@fortawesome/free-solid-svg-icons";

function Cart() {
  const api = useAxios();
  const {
    totalAmount,
    setTotalAmount,
    cartCounter,
    setCartCounter,
    activeCoupon,
    setActiveCoupon,
    discountAmount,
    setDiscountAmount,
  } = useContext(DataContainer);
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api
      .get("cart")
      .then((response) => {
        setCartData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line
  }, []);
  const incrementQuantity = (id) => {
    const updatedCartData = cartData.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    const IncreasingCartItem = cartData.find((item) => item.id === id);
    api
      .put(`cart/${id}`, { action: "increment" })
      .then((response) => {
        setCartData(updatedCartData);
        setTotalAmount(
          totalAmount + IncreasingCartItem.cart_product.offer_price
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const decrementQuantity = (id) => {
    const updatedCartData = cartData.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity - 1 } : item
    );
    const decreasingCartItem = cartData.find((item) => item.id === id);
    api
      .put(`cart/${id}`, { action: "decrement" })
      .then((response) => {
        setCartData(updatedCartData);
        setTotalAmount(
          totalAmount - decreasingCartItem.cart_product.offer_price
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const removeCartItem = (id) => {
    const updatedCartData = cartData.filter((item) => item.id !== id);
    const removedCartItem = cartData.find((item) => item.id === id);
    const removedItemTotal =
      removedCartItem.cart_product.offer_price * removedCartItem.quantity;
    api
      .delete(`cart/${id}`)
      .then((response) => {
        setTotalAmount(totalAmount - removedItemTotal);
        setCartCounter(cartCounter - 1);
        setCartData(updatedCartData);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const RemoveCoupon = () => {
    api
      .put(`profile/coupon/${activeCoupon?.id}`)
      .then((response) => {
        setActiveCoupon([]);
        setDiscountAmount(0);
      })
      .catch((error) => {});
  };
  if (loading) {
    return <Loader />;
  }
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
                      <td>
                        {cartItem.cart_product.max_offer > 0 ? (
                          <p className="text-green-700 text-lg">
                            ₹
                            {cartItem.cart_product.offer_price.toLocaleString(
                              "en-IN"
                            )}{" "}
                            <small className="line-through text-gray-700 text-xs">
                              ₹
                              {cartItem.cart_product.price.toLocaleString(
                                "en-IN"
                              )}
                            </small>
                          </p>
                        ) : (
                          <p className="">₹{cartItem.cart_product.price}</p>
                        )}
                      </td>
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
                        ₹
                        {(
                          cartItem.cart_product.offer_price * cartItem.quantity
                        ).toLocaleString("en-IN")}
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
                      {cartItem.cart_product.max_offer > 0 ? (
                        <span className="font-bold text-green-700 text-[12px]">
                          ₹
                          {cartItem.cart_product.offer_price.toLocaleString(
                            "en-IN"
                          )}{" "}
                          <strike className="text-[6px] text-gray-700">
                            ₹
                            {cartItem.cart_product.price.toLocaleString(
                              "en-IN"
                            )}
                          </strike>
                        </span>
                      ) : (
                        <span className="font-bold">
                          ₹{cartItem.cart_product.price.toLocaleString("en-IN")}
                        </span>
                      )}
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
                          ₹
                          {(
                            cartItem.cart_product.offer_price *
                            cartItem.quantity
                          ).toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeCartItem(cartItem.id)}
                      className="absolute -right-1 text-center -top-1 z-10 bg-white text-slate-400 text-xs rounded-full w-5 h-5 border"
                    >
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
                <CouponBox
                  setTotalAmount={setTotalAmount}
                  totalAmount={totalAmount}
                  activeCoupon={activeCoupon}
                  setActiveCoupon={setActiveCoupon}
                  discountAmount={discountAmount}
                  setDiscountAmount={setDiscountAmount}
                />
              </div>
              {Object.keys(activeCoupon).length !== 0 &&
                activeCoupon.coupon && (
                  <div className="my-3 text-center">
                    <span className="text-green-500 tracking-widest">
                      <FontAwesomeIcon icon={faTicket} />{" "}
                      {activeCoupon?.coupon.coupon_code}{" "}
                    </span>
                    <button onClick={RemoveCoupon} className="text-red-600">
                      <FontAwesomeIcon icon={faClose} />
                    </button>
                  </div>
                )}
              <hr />
              <div className="my-3">
                <div className="flex justify-between">
                  <span className="text-md">SUBTOTAL</span>
                  <span className="text-gray-200">&#8377;{totalAmount}</span>
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
                  <span className="text-gray-200 font-bold text-md">
                    ${totalAmount - discountAmount}
                  </span>
                </div>
                <Link
                  to="checkout"
                  className="block text-center w-full bg-teal-600 py-2 my-2"
                >
                  checkout &rarr;
                </Link>
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
