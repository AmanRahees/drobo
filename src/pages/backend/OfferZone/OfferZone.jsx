import React from "react";
import { useLocation } from "react-router-dom";
import Struct from "../../../components/backend/Struct/Struct";
import Tabs from "../../../components/backend/Tabs/Tabs";
import CategoryOffer from "./CategoryOffer";
import BrandOffer from "./BrandOffer";
import ProductOffer from "./ProductOffer";
import Coupons from "./Coupons";

function OfferZone() {
  const location = useLocation();
  const Component = () => {
    if (location.pathname === "/admin/offer-management/category") {
      return <CategoryOffer />;
    } else if (location.pathname === "/admin/offer-management/brands") {
      return <BrandOffer />;
    } else if (location.pathname === "/admin/offer-management/products") {
      return <ProductOffer />;
    } else if (location.pathname === "/admin/offer-management/coupons") {
      return <Coupons />;
    }
  };
  return (
    <Struct>
      <h1 className="text-2xl md:text-4xl">Offer Management</h1>
      <div className="my-5">
        <Tabs />
      </div>
      <div className="mt-10">
        <Component />
      </div>
    </Struct>
  );
}

export default OfferZone;
