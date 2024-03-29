import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataContainer from "../../../contexts/DataContainer";
import { apiUrl } from "../../../services/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCreditCard,
  faGift,
  faHeadset,
  faTag,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "../../../services/axios";
import Struct from "../../../components/frontend/Struct/Struct";
import Carousal from "../../../components/frontend/BannerCarousal/Carousal";
import ProductSlider from "../../../components/frontend/ProductSlider/ProductSlider";
import Loader from "../../../components/Loader/Loader";
import "./home.css";

function Home() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axiosInstance
      .get("shop/banners")
      .then((response) => {
        setBanners(response.data);
        setLoading(false);
      })
      .catch((error) => {});
  }, []);
  const products = [
    "data:image/jpeg;base64,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",
    "https://lh3.googleusercontent.com/Z_hNxWoSZ6J46N31m7A_KvHdvFHI9sFd1_ajACvM8eSSON9Vwb8Sz0T6ubX6MSB3QUz6ThgqjZo5qRdLJdhSaLzvn-u6yivWPmo=rw-e365-w3000",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D",
    "https://lh3.googleusercontent.com/Z_hNxWoSZ6J46N31m7A_KvHdvFHI9sFd1_ajACvM8eSSON9Vwb8Sz0T6ubX6MSB3QUz6ThgqjZo5qRdLJdhSaLzvn-u6yivWPmo=rw-e365-w3000",
    "https://lh3.googleusercontent.com/Z_hNxWoSZ6J46N31m7A_KvHdvFHI9sFd1_ajACvM8eSSON9Vwb8Sz0T6ubX6MSB3QUz6ThgqjZo5qRdLJdhSaLzvn-u6yivWPmo=rw-e365-w3000",
    "https://lh3.googleusercontent.com/Z_hNxWoSZ6J46N31m7A_KvHdvFHI9sFd1_ajACvM8eSSON9Vwb8Sz0T6ubX6MSB3QUz6ThgqjZo5qRdLJdhSaLzvn-u6yivWPmo=rw-e365-w3000",
  ];
  if (loading) {
    return <Loader />;
  }
  return (
    <Struct>
      <Carousal banners={banners} />
      <ProductSlider heading={"New Arrivals"} products={products} />
      <ProductSlider heading={"Trending"} products={products} />
      <div className="hm_ecomF">
        <div className="ecomF_Item">
          <div className="">
            <FontAwesomeIcon icon={faTruckFast} className="ecomF_Icon" />
          </div>
          <div className="">
            <p>Free Shipping</p>
            <span className="block">For all orders</span>
          </div>
        </div>
        <div className="ecomF_Item">
          <div className="">
            <FontAwesomeIcon icon={faGift} className="ecomF_Icon" />
          </div>
          <div className="">
            <p>Surprise Offers</p>
            <span className="block">Save upto 50%</span>
          </div>
        </div>
        <div className="ecomF_Item">
          <div className="">
            <FontAwesomeIcon icon={faHeadset} className="ecomF_Icon" />
          </div>
          <div className="">
            <p>Support 24/7</p>
            <span className="block">Shop with an expert</span>
          </div>
        </div>
        <div className="ecomF_Item">
          <div className="">
            <FontAwesomeIcon icon={faTag} className="ecomF_Icon" />
          </div>
          <div className="">
            <p>Affordable Prices</p>
            <span className="block">Get Factory direct price</span>
          </div>
        </div>
        <div className="ecomF_Item">
          <div className="">
            <FontAwesomeIcon icon={faCreditCard} className="ecomF_Icon" />
          </div>
          <div className="">
            <p>Secure Payments</p>
            <span className="block">100% Protected Payments</span>
          </div>
        </div>
      </div>
    </Struct>
  );
}

export default Home;
