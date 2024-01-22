import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBarsStaggered,
  faBox,
  faBoxes,
  faCartFlatbed,
  faDashboard,
  faPowerOff,
  faTableCells,
  faTags,
  faTruckFast,
  faUserCircle,
  faUsers,
  faPanorama,
} from "@fortawesome/free-solid-svg-icons";
import AuthContext from "../../../contexts/AuthContext";
import Modal from "../Modal/Modal";
import "./sidebar.css";

function Sidebar() {
  const location = useLocation();
  const { Logout } = useContext(AuthContext);
  const [sideXtnd, setSideXtnd] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  return (
    <>
      <div className={`sidebar ${sideXtnd ? "active" : ""}`}>
        <div className="sidebar-logo">
          <h1 className="sub-outline-2">drobo.</h1>
          <button onClick={() => setSideXtnd(!sideXtnd)}>
            <FontAwesomeIcon className="text-2xl" icon={faBarsStaggered} />
          </button>
        </div>
        <div className="sidebar-user">
          <FontAwesomeIcon
            className="sidebar-user-icon border-2 rounded-full border-slate-800"
            icon={faUserCircle}
          />
          <div className="sidebar-details capitalize">
            <h2 className="text-stone-300">Aman Rahees</h2>
            <small className="text-gray-600">Admin</small>
          </div>
        </div>
        <div className="sidebar-Items">
          <Link
            to="/admin"
            className={`sidebar-Item ${
              location.pathname === "/admin" ? "active" : ""
            }`}
          >
            <FontAwesomeIcon icon={faDashboard} />{" "}
            <span> &nbsp; Dashboard</span>
          </Link>
          <Link
            to="/admin/customers"
            className={`sidebar-Item ${
              location.pathname.includes("/admin/customers") ? "active" : ""
            }`}
          >
            <FontAwesomeIcon icon={faUsers} /> <span> &nbsp; Customers</span>
          </Link>
          <Link
            to="/admin/category"
            className={`sidebar-Item ${
              location.pathname.includes("/admin/category") ? "active" : ""
            }`}
          >
            <FontAwesomeIcon icon={faBoxes} /> <span> &nbsp; Category</span>
          </Link>
          <Link
            to="/admin/brands"
            className={`sidebar-Item ${
              location.pathname.includes("/admin/brands") ? "active" : ""
            }`}
          >
            <FontAwesomeIcon icon={faBox} /> <span> &nbsp; Brands</span>
          </Link>
          <Link
            to="/admin/products"
            className={`sidebar-Item ${
              location.pathname.includes("/admin/products") ? "active" : ""
            }`}
          >
            <FontAwesomeIcon icon={faTableCells} />{" "}
            <span> &nbsp; Products</span>
          </Link>
          <Link
            to="/admin/inventory"
            className={`sidebar-Item ${
              location.pathname.includes("/admin/inventory") ? "active" : ""
            }`}
          >
            <FontAwesomeIcon icon={faCartFlatbed} />{" "}
            <span> &nbsp; Inventory</span>
          </Link>
          <Link
            to="/admin/orders"
            className={`sidebar-Item ${
              location.pathname.includes("/admin/orders") ? "active" : ""
            }`}
          >
            <FontAwesomeIcon icon={faTruckFast} /> <span> &nbsp; Orders</span>
          </Link>
          <Link
            to="/admin/offer-management/category"
            className={`sidebar-Item ${
              location.pathname.includes("/admin/offer-management")
                ? "active"
                : ""
            }`}
          >
            <FontAwesomeIcon icon={faTags} />{" "}
            <span> &nbsp; Offer Management</span>
          </Link>
          <Link
            to="/admin/banners"
            className={`sidebar-Item ${
              location.pathname.includes("/admin/banners") ? "active" : ""
            }`}
          >
            <FontAwesomeIcon icon={faPanorama} /> <span> &nbsp; Banners</span>
          </Link>
          <button
            onClick={() => setShowLogout(!showLogout)}
            className={`sidebar-Item text-left text-red-500`}
          >
            <FontAwesomeIcon icon={faPowerOff} /> <span> &nbsp; Logout</span>
          </button>
        </div>
      </div>
      {showLogout && (
        <Modal>
          <h1 className="modal-heading">Logout</h1>
          <div className="modal-divider"></div>
          <p className="modal-content">Are you that you Logout?</p>
          <div className="modal-divider"></div>
          <div className="modal-btns">
            <button
              onClick={() => setShowLogout(false)}
              className="bg-gray-800"
            >
              Cancel
            </button>
            <button onClick={Logout} className="bg-red-600">
              Yes
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}

export default Sidebar;
