import React, { useState } from "react";
import useAxios from "../../../services/useAxios";
import Modal from "../../../components/backend/Modal/Modal";

const ChangeStatus = ({
  selectedId,
  orderData,
  setOrdersData,
  setStatusModal,
}) => {
  const api = useAxios();
  const [selectedOrder, setSelectedOrder] = useState(
    orderData.find((order) => order.id === selectedId)
  );
  const handleStatusChange = (value) => {
    const updatedOrder = { ...selectedOrder, status: value };
    setSelectedOrder(updatedOrder);
  };
  const handleStatusSubmit = () => {
    const updatedOrderData = orderData.map((order) =>
      order.id === selectedOrder.id ? selectedOrder : order
    );
    api
      .put(`admin/orders/${selectedId}`, selectedOrder)
      .then((response) => {
        console.log("ok");
        setOrdersData(updatedOrderData);
        setStatusModal(false);
      })
      .catch((error) => {});
  };
  return (
    <Modal>
      <p className="modal-heading font-bold">
        ORDER ID: #{selectedOrder.order_no}
      </p>
      <div className="modal-divider"></div>
      <div className="w-[350px]">
        <div className="flex justify-between my-3">
          <label htmlFor="orderConfirmed_">Order Confirmed</label>
          <input
            type="radio"
            name="order_status"
            value="Order Confirmed"
            id="orderConfirmed_"
            onChange={(e) => handleStatusChange(e.target.value)}
            checked={selectedOrder.status === "Order Confirmed"}
          />
        </div>
        <div className="flex justify-between my-3">
          <label htmlFor="orderShipped_">Shipped</label>
          <input
            type="radio"
            name="order_status"
            value="Shipped"
            id="orderShipped_"
            onChange={(e) => handleStatusChange(e.target.value)}
            checked={selectedOrder.status === "Shipped"}
          />
        </div>
        <div className="flex justify-between my-3">
          <label htmlFor="outForDelivery_">Out for Delivery</label>
          <input
            type="radio"
            name="order_status"
            value="Out for Delivery"
            id="outForDelivery_"
            onChange={(e) => handleStatusChange(e.target.value)}
            checked={selectedOrder.status === "Out for Delivery"}
          />
        </div>
        <div className="flex justify-between my-3">
          <label htmlFor="orderDelivered_">Delivered</label>
          <input
            type="radio"
            name="order_status"
            value="Delivered"
            id="orderDelivered_"
            onChange={(e) => handleStatusChange(e.target.value)}
            checked={selectedOrder.status === "Delivered"}
          />
        </div>
        <div className="flex justify-between my-3">
          <label htmlFor="orderCancel_">Cancel Order</label>
          <input
            type="radio"
            name="order_status"
            value="Order Cancelled"
            id="orderCancel_"
            onChange={(e) => handleStatusChange(e.target.value)}
          />
        </div>
      </div>
      <div className="modal-divider"></div>
      <div className="modal-btns">
        <button onClick={() => setStatusModal(false)} className="bg-gray-800">
          Cancel
        </button>
        <button onClick={handleStatusSubmit} className="bg-red-600">
          Save
        </button>
      </div>
    </Modal>
  );
};

export default ChangeStatus;
