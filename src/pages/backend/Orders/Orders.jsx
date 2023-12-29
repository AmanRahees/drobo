import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Struct from "../../../components/backend/Struct/Struct";
import Modal from "../../../components/backend/Modal/Modal";
import StatusBtn from "./StatusBtn";
import "./orders.css";

function Orders() {
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const FilterRef = useRef(null);
  const handleSelected = (id) => {
    if (selected.includes(id)) {
      setSelected((prevSelected) =>
        prevSelected.filter((selectedId) => selectedId !== id)
      );
    } else {
      setSelected((prevSelected) => [...prevSelected, id]);
    }
  };
  const handleDeletion = () => {
    console.log(selected);
    setSelected([]);
    setDeleteModal(false);
  };
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
  return (
    <Struct>
      {selected.length > 0 && (
        <button
          onClick={() => setDeleteModal(true)}
          className="float-right bg-red-600 py-1 px-3 rounded-md"
        >
          <FontAwesomeIcon icon={faTrash} /> ({selected.length})
        </button>
      )}
      <h1 className="text-3xl md:text-4xl text-sub-color">Orders</h1>

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
            <th></th>
            <th>Tracking No.</th>
            <th>Product</th>
            <th>Price</th>
            <th>Order Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="relative">
              <input
                type="checkbox"
                className="OrderCheck_"
                onChange={() => handleSelected(1)}
                checked={selected.includes(1)}
              />
            </td>
            <td className="text-sub-color cursor-pointer">
              <Link to={`/admin/order/#DBO2983734`}>#DBO2983734</Link>
            </td>
            <td>Galaxy S22 Ultra</td>
            <td>$8237</td>
            <td>
              23 Aug 2023 <br /> (2 days)
            </td>
            <td>
              <StatusBtn
                status={"Shipped"}
                clickEvent={() => setDeleteModal(true)}
              />
            </td>
          </tr>
        </tbody>
      </table>

      {deleteModal && (
        <Modal>
          <h1 className="modal-heading">Modal Heading</h1>
          <div className="modal-divider"></div>
          <p className="modal-content">
            Are you sure that you want to delete this Items?
          </p>
          <div className="modal-divider"></div>
          <div className="modal-btns">
            <button
              onClick={() => setDeleteModal(false)}
              className="bg-gray-800"
            >
              Cancel
            </button>
            <button onClick={() => handleDeletion()} className="bg-red-600">
              Yes
            </button>
          </div>
        </Modal>
      )}
    </Struct>
  );
}

export default Orders;
