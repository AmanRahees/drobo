import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faBoxOpen,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import useAxios from "../../../services/useAxios";
import Struct from "../../../components/backend/Struct/Struct";
import Loader from "../../../components/Loader/Loader";
import ChangeStatus from "./ChangeStatus";
import StatusBtn from "./StatusBtn";
import "./orders.css";

function Orders() {
  const api = useAxios();
  const [orderData, setOrdersData] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState("All");
  const [selectedId, setSelectedId] = useState([]);
  const [statusModal, setStatusModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const FilterRef = useRef(null);
  const handleFilterShow = () => {
    setShowFilter((prevState) => !prevState);
  };
  const handleClickOutside = (event) => {
    if (FilterRef.current && !FilterRef.current.contains(event.target)) {
      setShowFilter(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    api
      .get("admin/orders")
      .then((response) => {
        setOrdersData(response.data);
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
      <h1 className="text-3xl md:text-4xl text-sub-color">Orders</h1>

      {orderData.length > 0 ? (
        <>
          <div className="pl-searchBox">
            <input type="text" placeholder="Search..." />
            <FontAwesomeIcon icon={faSearch} className="pl-searchIcon" />
          </div>

          <div ref={FilterRef} className="_orderFilterBox">
            <button className="bg-backend" onClick={handleFilterShow}>
              Filter <FontAwesomeIcon icon={faAngleDown} />
            </button>
            {showFilter && (
              <div className="_orderFilterOpts rounded-md">
                <span
                  onClick={() => setFilter("All")}
                  className={`border-b border-gray-600 rounded-t-md ${
                    filter === "All" ? "active" : ""
                  }`}
                >
                  All
                </span>
                <span
                  onClick={() => setFilter("Order Confirmed")}
                  className={`border-b border-gray-600 ${
                    filter === "Order Confirmed" ? "active" : ""
                  }`}
                >
                  Order Confirmed
                </span>
                <span
                  onClick={() => setFilter("Shipped")}
                  className={`border-b border-gray-600 ${
                    filter === "Shipped" ? "active" : ""
                  }`}
                >
                  Shipped
                </span>
                <span
                  onClick={() => setFilter("Out for Delivery")}
                  className={`border-b border-gray-600 ${
                    filter === "Out for Delivery" ? "active" : ""
                  }`}
                >
                  Out for Delivery
                </span>
                <span
                  onClick={() => setFilter("Delivered")}
                  className={`border-b border-gray-600 ${
                    filter === "Delivered" ? "active" : ""
                  }`}
                >
                  Delivered
                </span>
                <span
                  onClick={() => setFilter("Order Cancelled")}
                  className={`rounded-b-md ${
                    filter === "Order Cancelled" ? "active" : ""
                  }`}
                >
                  Order Cancelled
                </span>
              </div>
            )}
          </div>

          <table className="backendTable">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Location</th>
                <th>Price</th>
                <th>Payment</th>
                <th>Order Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orderData.map((order, index) => (
                <tr key={index}>
                  <td className="text-sub-color">
                    <Link
                      to={`/admin/orders/${order.id}/${order.order_no}`}
                      className="text-sm"
                    >
                      #{order.order_no}
                    </Link>
                  </td>
                  <td>
                    <div className="flex gap-2 items-center">
                      <img
                        src="data:image/jpeg;base64,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"
                        alt=""
                        className="w-10 rounded-full"
                      />
                      <div className="flex flex-col text-left">
                        <span className="capitalize block">
                          {order.user.username}
                        </span>
                        <small className="text-gray-600">
                          {order.user.email}
                        </small>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-break-spaces">
                    {order.city}, {order.state}
                  </td>
                  <td>&#8377;{order.grand_total.toLocaleString("en-IN")}</td>
                  <td>{order.payment_mode}</td>
                  <td>{formatOrderDate(order.created_at)}</td>
                  <td>
                    <StatusBtn
                      status={order.status}
                      clickEvent={() => {
                        setSelectedId(order.id);
                        setStatusModal(true);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <div className="flex justify-center items-center h-full">
          <div className="flex flex-col">
            <FontAwesomeIcon icon={faBoxOpen} className="text-9xl" />
            <p className="text-center my-3 text-2xl">No Orders</p>
          </div>
        </div>
      )}

      {statusModal && (
        <ChangeStatus
          selectedId={selectedId}
          orderData={orderData}
          setOrdersData={setOrdersData}
          setStatusModal={setStatusModal}
        />
      )}
    </Struct>
  );
}

export default Orders;
