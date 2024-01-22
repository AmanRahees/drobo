import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useAxios from "../../../services/useAxios";
import Struct from "../../../components/frontend/Struct/Struct";
import Account from "../../../components/frontend/Account/Account";
import ImageGallery from "../../../components/frontend/OrderImgGallery/OrderImgGallery";
import Loader from "../../../components/Loader/Loader";
import "./orders.css";

function MyOrders() {
  const api = useAxios();
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api
      .get("profile/my-orders")
      .then((response) => {
        setMyOrders(response.data);
        setLoading(false);
      })
      .catch((error) => {});
    // eslint-disable-next-line
  }, []);
  const formatOrderDate = (order_date) => {
    let date = new Date(order_date);
    let options = { day: "numeric", month: "short", year: "numeric" };
    let formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <Struct>
      <Account>
        <p className="text-base md:text-2xl font-bold">My Orders</p>
        <div className="my-3">
          {myOrders.length > 0 ? (
            myOrders.map((order, index) => (
              <div
                key={index}
                className="_orderCardBox bg-slate-50 shadow my-3"
              >
                <div className="w-full my-3">
                  <ImageGallery
                    images={order.orderItems.map((item) => item.product.image)}
                    maxVisibleCount={1}
                  />
                </div>
                <div className="my-auto">
                  <p className="text-gray-700 text-sm md:text-base">
                    Order Number:{" "}
                    <span className="font-bold text-primary-color">
                      {order.order_no}
                    </span>
                  </p>
                  <small className="block my-1 text-gray-700 text-xs md:text-xs">
                    Order Status:{" "}
                    <span className="font-bold text-primary-color">
                      {order.status}
                    </span>
                  </small>
                  <small className="block my-1 text-gray-700 text-xs md:text-xs">
                    Order Date:{" "}
                    <span className="font-bold text-primary-color">
                      {formatOrderDate(order.created_at)}
                    </span>
                  </small>
                  <small className="block my-1 text-gray-700 text-xs md:text-xs">
                    Total:{" "}
                    <span className="font-bold text-primary-color">
                      &#8377;{order.total_price.toLocaleString("en-IN")}
                    </span>
                  </small>
                </div>
                <Link
                  to={`/profile/orders/${order.id}/${order.order_no}`}
                  className="text-white bg-primary-color w-full md:w-auto px-3 py-2 rounded-md text-xs md:text-sm text-center my-2 md:my-auto"
                >
                  View and Track &rarr;
                </Link>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center aspect-video">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faBoxOpen}
                    className="text-[120px] text-gray-800"
                  />
                  <div className="absolute bottom-2 right-2">
                    <FontAwesomeIcon
                      icon={faCircleXmark}
                      className="text-3xl text-red-600 bg-white rounded-full"
                    />
                  </div>
                </div>
                <p className="text-center text-lg font-bold text-primary-color">
                  You have no orders
                </p>
                <Link
                  to="/shop"
                  className="bg-primary-color text-white my-3 py-2 px-5 text-sm rounded-md"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          )}
        </div>
      </Account>
    </Struct>
  );
}

export default MyOrders;
