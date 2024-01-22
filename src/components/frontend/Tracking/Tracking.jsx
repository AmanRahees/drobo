import React from "react";
import "./tracking.css";

const Tracking = () => {
  return (
    <div className="order-track">
      <div className="order-track-step">
        <div className="order-track-status">
          <span className="order-track-status-dot active"></span>
          <span className="order-track-status-line active"></span>
        </div>
        <div className="order-track-text">
          <p className="order-track-text-stat">Order Confirmed</p>
          <span className="order-track-text-sub">21st November, 2019</span>
        </div>
      </div>
      <div className="order-track-step">
        <div className="order-track-status">
          <span className="order-track-status-dot active"></span>
          <span className="order-track-status-line"></span>
        </div>
        <div className="order-track-text">
          <p className="order-track-text-stat">Shipped</p>
          <span className="order-track-text-sub">21st November, 2019</span>
        </div>
      </div>
      <div className="order-track-step">
        <div className="order-track-status">
          <span className="order-track-status-dot"></span>
          <span className="order-track-status-line"></span>
        </div>
        <div className="order-track-text">
          <p className="order-track-text-stat">Out For Delivery</p>
          <span className="order-track-text-sub">21st November, 2019</span>
        </div>
      </div>
      <div className="order-track-step">
        <div className="order-track-status">
          <span className="order-track-status-dot"></span>
          <span className="order-track-status-line"></span>
        </div>
        <div className="order-track-text">
          <p className="order-track-text-stat">Delivered</p>
          <span className="order-track-text-sub">21st November, 2019</span>
        </div>
      </div>
    </div>
  );
};

export default Tracking;
