import React from "react";
import "./tracking.css";

const Tracking = ({ orderDate, trackings }) => {
  const shippedTracking = trackings.find(
    (tracking) => tracking.status === "Shipped"
  );
  const shippedTime = shippedTracking ? shippedTracking.created_at : null;
  const outForDeliveryTracking = trackings.find(
    (tracking) => tracking.status === "Out for Delivery"
  );
  const outForDeliveryTime = outForDeliveryTracking
    ? outForDeliveryTracking.created_at
    : null;
  const deliveryTracking = trackings.find(
    (tracking) => tracking.status === "Delivered"
  );
  const deliveryTime = deliveryTracking ? deliveryTracking.created_at : null;
  const formatDate = (order_date) => {
    let date = new Date(order_date);
    let options = { day: "numeric", month: "short", year: "numeric" };
    let formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  };
  const formatTime = (order_date) => {
    let date = new Date(order_date);
    let options = { hour: "numeric", minute: "numeric", hour12: true };
    let formattedTime = date.toLocaleString("en-US", options);
    return formattedTime;
  };
  return (
    <div className="order-track">
      <div className="order-track-step">
        <div className="order-track-status">
          <span className="order-track-status-dot active"></span>
          <span
            className={`order-track-status-line ${
              shippedTracking ? "active" : ""
            }`}
          ></span>
        </div>
        <div className="order-track-text">
          <p className="order-track-text-stat">Order Confirmed</p>
          <span className="order-track-text-sub">{formatDate(orderDate)}</span>
          <small className="ml-3">{formatTime(orderDate)}</small>
        </div>
      </div>
      <div className="order-track-step">
        <div className="order-track-status">
          <span
            className={`order-track-status-dot ${
              shippedTracking ? "active" : ""
            }`}
          ></span>
          <span
            className={`order-track-status-line ${
              outForDeliveryTracking ? "active" : ""
            }`}
          ></span>
        </div>
        <div className="order-track-text">
          <p className="order-track-text-stat">Shipped</p>
          <span className="order-track-text-sub">
            {shippedTracking && formatDate(shippedTime)}
          </span>
          <small className="ml-3">
            {shippedTracking && formatTime(shippedTime)}
          </small>
        </div>
      </div>
      <div className="order-track-step">
        <div className="order-track-status">
          <span
            className={`order-track-status-dot ${
              outForDeliveryTracking ? "active" : ""
            }`}
          ></span>
          <span
            className={`order-track-status-line ${
              deliveryTracking ? "active" : ""
            }`}
          ></span>
        </div>
        <div className="order-track-text">
          <p className="order-track-text-stat">Out For Delivery</p>
          <span className="order-track-text-sub">
            {outForDeliveryTracking && formatDate(outForDeliveryTime)}
          </span>
          <small className="ml-3">
            {outForDeliveryTracking && formatTime(outForDeliveryTime)}
          </small>
        </div>
      </div>
      <div className="order-track-step">
        <div className="order-track-status">
          <span
            className={`order-track-status-dot ${
              deliveryTracking ? "active" : ""
            }`}
          ></span>
          <span className="order-track-status-line"></span>
        </div>
        <div className="order-track-text">
          <p className="order-track-text-stat">Delivered</p>
          <span className="order-track-text-sub">
            {deliveryTracking && formatDate(deliveryTime)}
          </span>
          <small className="ml-3">
            {deliveryTracking && formatTime(deliveryTime)}
          </small>
        </div>
      </div>
    </div>
  );
};

export default Tracking;
