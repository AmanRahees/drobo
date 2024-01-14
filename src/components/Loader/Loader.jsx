import React from "react";
import { useLocation } from "react-router-dom";
import "./loader.css";

function Loader() {
  const location = useLocation();
  console.log(location);
  return (
    <div
      className={`loaderBox ${
        location.pathname.includes("/admin") ? "bg-black" : "bg-primary-color"
      }`}
    >
      <div
        className={`loader ${
          location.pathname.includes("/admin") ? "text-sub-color" : "text-white"
        }`}
      ></div>
    </div>
  );
}

export default Loader;
