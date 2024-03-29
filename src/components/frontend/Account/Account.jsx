import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faFolder,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";
import DataContainer from "../../../contexts/DataContainer";
import Men from "../../../assets/imgs/men-avatar.jpg";
import Women from "../../../assets/imgs/womon-avatar.png";
import "./account.css";

function Account({ children }) {
  const location = useLocation();
  const { userInfo } = useContext(DataContainer);
  return (
    <div className="pfl-container">
      <div className="_pftCurrUser flex justify-start items-center gap-3">
        <img
          className="w-[60px] border border-zinc-950 rounded-full"
          src={userInfo?.gender === "Female" ? Women : Men}
          alt="img"
        />
        <div className="text-left">
          <small>Hello,</small>
          <p className="capitalize">{userInfo?.username}</p>
        </div>
      </div>
      <div className="_pftSideBar">
        <div className="_pftBar_box">
          <p className="flex items-center text-gray-500 gap-3 text-lg py-2">
            <FontAwesomeIcon icon={faUser} className="text-2xl text-teal-600" />{" "}
            ACCOUNT
          </p>
          <div className="_pftBarB">
            <Link
              to="/profile"
              className={`_pftBarLinks ${
                location.pathname === "/profile" ? "active" : ""
              } py-2`}
            >
              Profile Information
            </Link>
            <Link
              to="/profile/addresses"
              className={`_pftBarLinks ${
                location.pathname === "/profile/addresses" ? "active" : ""
              } py-2`}
            >
              Manage Addresses
            </Link>
          </div>
        </div>
        <hr />
        <div className="_pftBar_box">
          <p className="flex items-center text-gray-500 gap-3 text-lg py-2">
            <FontAwesomeIcon
              icon={faFolder}
              className="text-2xl text-teal-600"
            />{" "}
            MY STUFF
          </p>
          <div className="_pftBarB">
            <Link
              to="/shop/cart"
              className={`_pftBarLinks ${
                location.pathname === "/shop/cart" ? "active" : ""
              } py-2`}
            >
              My Cart
            </Link>
            <Link
              to="/profile/orders"
              className={`_pftBarLinks ${
                location.pathname === "/profile/orders" ? "active" : ""
              } py-2`}
            >
              My Orders
            </Link>
            <Link
              to="/profile/coupons"
              className={`_pftBarLinks ${
                location.pathname === "/profile/coupons" ? "active" : ""
              } py-2`}
            >
              My Coupons
            </Link>
          </div>
        </div>
        <hr />
        <div className="_pftBar_box">
          <p className="flex items-center text-red-500 gap-3 text-lg py-2">
            <FontAwesomeIcon icon={faPowerOff} /> LOGOUT
          </p>
        </div>
      </div>
      <div className="_pftContentBox">{children}</div>
    </div>
  );
}

export default Account;
