import React from "react";
import { Link, useLocation } from "react-router-dom";

const Tabs = () => {
  const location = useLocation();
  return (
    <div className="pl_filter">
      <Link
        to="/admin/offer-management/category"
        className={`p-2 rounded-lg ${
          location.pathname === "/admin/offer-management/category"
            ? "bg-sub-color"
            : "bg-121"
        }`}
      >
        Category
      </Link>
      <Link
        to="/admin/offer-management/brands"
        className={`p-2 rounded-lg ${
          location.pathname === "/admin/offer-management/brands"
            ? "bg-sub-color"
            : "bg-121"
        }`}
      >
        Brands
      </Link>
      <Link
        to="/admin/offer-management/products"
        className={`p-2 rounded-lg ${
          location.pathname === "/admin/offer-management/products"
            ? "bg-sub-color"
            : "bg-121"
        }`}
      >
        Products
      </Link>
      <Link
        to="/admin/offer-management/coupons"
        className={`p-2 rounded-lg ${
          location.pathname === "/admin/offer-management/coupons"
            ? "bg-sub-color"
            : "bg-121"
        }`}
      >
        Coupons
      </Link>
    </div>
  );
};

export default Tabs;
