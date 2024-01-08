import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthContext from "../../../contexts/AuthContext";
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
  faHome,
  faShop,
  faBlog,
  faCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";
import cartIcon from "../../../assets/icons/icons8-cart-48.png";
import "./navbar.css";

function Navbar() {
  const location = useLocation();
  const { userData, Logout } = useContext(AuthContext);
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
          <Link to="/" className="nav-logo" title="drobo">
            <h1>drobo.</h1>
          </Link>
          <div className="nav-search">
            <form className="flex">
              <input type="text" placeholder="Search for Products" />
              <button className="bg-teal-700">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </form>
          </div>
          <div className="flex items-center gap-3">
            {!userData ? (
              <Link
                to="/login"
                className="flex justify-center items-center bg-white px-3 py-1"
              >
                Login
              </Link>
            ) : (
              <div className="nav-userBox">
                <button className="flex justify-center items-center gap-2 capitalize nav-user-show">
                  <FontAwesomeIcon
                    className="text-2xl nav-user_"
                    icon={faCircleUser}
                  />
                  {userData.username}
                  <FontAwesomeIcon className="nav-angle_" icon={faAngleDown} />
                </button>
                <div className="nav-userOpts_ absolute right-0 z-10 mt-3 w-48 origin-top-right rounded-md shadow-lg">
                  <Link className="text-gray-700 px-6 py-3 text-sm flex items-center gap-2">
                    <FontAwesomeIcon className="text-xl" icon={faCircleUser} />
                    <span>Account</span>
                  </Link>
                  <Link className="text-gray-700 px-6 py-3 text-sm flex items-center gap-2">
                    <FontAwesomeIcon className="text-lg" icon={faBoxOpen} />
                    Orders
                  </Link>
                  <hr />
                  <button
                    onClick={() => Logout()}
                    className="text-red-700 px-6 py-3 text-sm flex items-center gap-2"
                  >
                    <FontAwesomeIcon className="text-lg" icon={faPowerOff} />
                    Logout
                  </button>
                </div>
              </div>
            )}
            <button className="nav-cartBox" title="Cart">
              <div className="relative">
                <img src={cartIcon} alt="cart" />
                <span className="cart-counter font-bold bg-teal-600">2</span>
              </div>
            </button>
          </div>
        </div>
        <div className="bg-primary-color w-full pb-4">
          <div className="flex justify-center items-center md:gap-7 lg:gap-10 text-white">
            <Link
              to="/"
              className={`${
                location.pathname === "/"
                  ? "border-b border-teal-600 text-teal-600"
                  : ""
              }`}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className={`${
                location.pathname.includes("/shop")
                  ? "border-b border-teal-600 text-teal-600"
                  : ""
              }`}
            >
              Shop
            </Link>
            <Link>Blogs</Link>
            <Link>Contact</Link>
          </div>
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
              {!userData && (
                <Link to="/login" className="bg-white text-gray-700 px-3 py-1">
                  Login
                </Link>
              )}
              <div className="nav-cartBox-sm relative">
                <img src={cartIcon} alt="cart" />
                <span className="cart-counter font-bold bg-teal-600">2</span>
              </div>
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
            {userData ? (
              <>
                <div className="flex justify-between bg-primary-color p-6 shadow-xl">
                  <p className="flex items-center gap-2 capitalize">
                    <FontAwesomeIcon className="text-2xl" icon={faUser} />
                    {userData?.username}
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
                <hr />
                <Link className="text-gray-700 px-6 py-3 text-sm flex items-center gap-2">
                  <FontAwesomeIcon className="text-xl" icon={faHome} />
                  Home
                </Link>
                <Link className="text-gray-700 px-6 py-3 text-sm flex items-center gap-2">
                  <FontAwesomeIcon className="text-xl" icon={faShop} />
                  Shop
                </Link>
                <Link className="text-gray-700 px-6 py-3 text-sm flex items-center gap-2">
                  <FontAwesomeIcon className="text-lg" icon={faCartShopping} />
                  Cart
                </Link>
                <Link className="text-gray-700 px-6 py-3 text-sm flex items-center gap-2">
                  <FontAwesomeIcon className="text-lg" icon={faBlog} />
                  Blogs
                </Link>
                <Link className="text-gray-700 px-6 py-3 text-sm flex items-center gap-2">
                  <FontAwesomeIcon
                    className="text-lg"
                    icon={faCircleQuestion}
                  />
                  Contact
                </Link>
                <hr />
                <Link className="text-red-700 px-6 py-3 text-sm flex items-center gap-2">
                  <FontAwesomeIcon className="text-lg" icon={faPowerOff} />
                  Logout
                </Link>
              </>
            ) : (
              <>
                <div className="flex justify-between bg-primary-color p-6 shadow-xl">
                  <p className="flex items-center gap-2">
                    <FontAwesomeIcon className="text-2xl" icon={faUser} />
                    <Link to="/login">Login</Link>
                  </p>
                  <button onClick={() => setShowSidebar(false)}>
                    <FontAwesomeIcon icon={faClose} />
                  </button>
                </div>
                <Link className="text-gray-700 px-6 py-3 text-sm flex items-center gap-2">
                  <FontAwesomeIcon className="text-xl" icon={faHome} />
                  Home
                </Link>
                <Link className="text-gray-700 px-6 py-3 text-sm flex items-center gap-2">
                  <FontAwesomeIcon className="text-xl" icon={faShop} />
                  Shop
                </Link>
                <Link className="text-gray-700 px-6 py-3 text-sm flex items-center gap-2">
                  <FontAwesomeIcon className="text-lg" icon={faCartShopping} />
                  Cart
                </Link>
                <Link className="text-gray-700 px-6 py-3 text-sm flex items-center gap-2">
                  <FontAwesomeIcon className="text-lg" icon={faBlog} />
                  Blogs
                </Link>
                <Link className="text-gray-700 px-6 py-3 text-sm flex items-center gap-2">
                  <FontAwesomeIcon
                    className="text-lg"
                    icon={faCircleQuestion}
                  />
                  Contact
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
