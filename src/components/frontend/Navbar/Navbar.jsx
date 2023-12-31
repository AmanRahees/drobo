import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCircleUser,
  faAngleDown,
  faBoxOpen,
  faPowerOff,
  faBars,
  faClose,
  faUser,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import cartIcon from "../../../assets/icons/icons8-cart-48.png";
import "./navbar.css";

function Navbar() {
  const [showSidebar, setShowSidebar] = useState(false);
  const showSideBarRef = useRef(null);
  const handleClickOutside = (event) => {
    if (
      showSideBarRef.current &&
      !showSideBarRef.current.contains(event.target)
    ) {
      setShowSidebar(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>
      <div className="Navbar_lg">
        <div className="nav-container">
          <div className="nav-logo" title="drobo">
            <h1>drobo.</h1>
          </div>
          <div className="nav-search">
            <form className="flex">
              <button className="rounded-tl-md rounded-bl-md">
                <FontAwesomeIcon icon={faSearch} />
              </button>
              <input
                type="text"
                placeholder="Search for Products"
                className="rounded-tr-md rounded-br-md"
              />
            </form>
          </div>
          <button className="nav-userBox">
            <Link
              to="/login"
              className="flex justify-center items-center gap-2"
            >
              <FontAwesomeIcon
                className="text-2xl nav-user_"
                icon={faCircleUser}
              />
              Login
              <FontAwesomeIcon className="nav-angle_" icon={faAngleDown} />
            </Link>
            <div className="nav-userOpts_ absolute left-0 z-10 mt-3 w-56 origin-top-right rounded-md shadow-lg">
              <Link
                to="/signup"
                className="text-gray-700 block px-6 py-3 text-sm"
              >
                New Customer
                <span className="block float-right text-green-800 font-bold">
                  SignUp
                </span>
              </Link>
              <hr />
              <Link className="text-gray-700 px-6 py-3 text-sm flex items-center gap-2">
                <FontAwesomeIcon className="text-xl" icon={faCircleUser} />
                My Profile
              </Link>
              <Link className="text-gray-700 px-6 py-3 text-sm flex items-center gap-2">
                <FontAwesomeIcon className="text-lg" icon={faBoxOpen} />
                Orders
              </Link>
              <hr />
              <Link className="text-red-700 px-6 py-3 text-sm flex items-center gap-2">
                <FontAwesomeIcon className="text-lg" icon={faPowerOff} />
                Logout
              </Link>
            </div>
          </button>
          <button className="nav-cartBox" title="Cart">
            <div className="relative">
              <img src={cartIcon} alt="cart" />
              <span className="cart-counter font-bold">2</span>
            </div>
          </button>
        </div>
      </div>
      <div className="Navbar_sm">
        <div className="nav-container-sm">
          <div className="nav-top">
            <div className="nav-logo-sm">
              <button onClick={() => setShowSidebar(!showSidebar)}>
                <FontAwesomeIcon icon={faBars} />
              </button>
              <h1>drobo.</h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="nav-cartBox-sm relative">
                <img src={cartIcon} alt="cart" />
                <span className="cart-counter font-bold">2</span>
              </div>
              <button className="bg-white text-gray-700 px-3 py-1">
                Login
              </button>
            </div>
          </div>
          <div className="nav-search-sm">
            <form className="flex">
              <button>
                <FontAwesomeIcon icon={faSearch} />
              </button>
              <input
                type="text"
                placeholder="Search for Products"
                className="text-black"
              />
            </form>
          </div>
          <div
            ref={showSideBarRef}
            className={`_nav-sidebar ${showSidebar ? "show" : ""}`}
          >
            <div className="flex justify-between bg-primary-color p-6 shadow-xl">
              <p className="flex items-center gap-2">
                <FontAwesomeIcon className="text-2xl" icon={faUser} />
                Aman Rahees
              </p>
              <button onClick={() => setShowSidebar(false)}>
                <FontAwesomeIcon icon={faClose} />
              </button>
            </div>
            <Link className="text-gray-700 px-6 py-3 text-sm flex items-center gap-2">
              <FontAwesomeIcon className="text-xl" icon={faCircleUser} />
              My Profile
            </Link>
            <Link className="text-gray-700 px-6 py-3 text-sm flex items-center gap-2">
              <FontAwesomeIcon className="text-lg" icon={faBoxOpen} />
              Orders
            </Link>
            <Link className="text-gray-700 px-6 py-3 text-sm flex items-center gap-2">
              <FontAwesomeIcon className="text-lg" icon={faCartShopping} />
              Cart
            </Link>
            <hr />
            <Link className="text-red-700 px-6 py-3 text-sm flex items-center gap-2">
              <FontAwesomeIcon className="text-lg" icon={faPowerOff} />
              Logout
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
