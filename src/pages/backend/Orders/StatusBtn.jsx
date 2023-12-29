import React from "react";

function StatusBtn({ status, clickEvent }) {
  if (status === "Order Confirmed") {
    return (
      <button
        onClick={clickEvent}
        className="bg-blue-600 px-3 py-1 rounded-md text-sm"
      >
        Order Confirmed
      </button>
    );
  } else if (status === "Shipped") {
    return (
      <button
        onClick={clickEvent}
        className="bg-teal-600 px-3 py-1 rounded-md text-sm"
      >
        Shipped
      </button>
    );
  } else if (status === "Out for Delivery") {
    return (
      <button
        onClick={clickEvent}
        className="bg-indigo-600 px-3 py-1 rounded-md text-sm"
      >
        Out for Delivery
      </button>
    );
  } else if (status === "Delivered") {
    return (
      <button
        onClick={clickEvent}
        className="bg-green-600 px-3 py-1 rounded-md text-sm"
      >
        Delivered
      </button>
    );
  } else if (status === "Order Cancelled") {
    return (
      <button
        onClick={clickEvent}
        className="bg-yellow-500 px-3 py-1 rounded-md text-sm"
      >
        Order Cancelled
      </button>
    );
  }
}

export default StatusBtn;
