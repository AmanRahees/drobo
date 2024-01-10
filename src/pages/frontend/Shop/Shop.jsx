import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../services/axios";
import { apiUrl } from "../../../services/constants";
import Struct from "../../../components/frontend/Struct/Struct";
import FilterBox from "../../../components/frontend/FilterBox/FilterBox";
import "./shop.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";

function Shop() {
  const navigate = useNavigate();
  const [productsData, setProductsData] = useState([]);
  useEffect(() => {
    axiosInstance
      .get("shop/products")
      .then((response) => {
        setProductsData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <Struct>
      <div className="_shop-container">
        <div className="_shop-filterBox">
          <FilterBox />
        </div>
        <div className="_shop-ItemList">
          {productsData.map((item, index) => (
            <div
              key={index}
              className="_shop-Item"
              onClick={() =>
                navigate(
                  `${item.product.category.toLowerCase()}/${item.product.id}/${
                    item.product.slug
                  }/${item.id}`
                )
              }
            >
              <span className="_pdtTop_slider">40%</span>
              <img
                src={`${apiUrl}${
                  item.images.find((img) => img.default_img === true)?.image
                }`}
                alt={
                  item.images.find((img) => img.default_img === true)?.image
                    .name
                }
              />
              <div className="py-2 px-3">
                <p className="_pdtName_slider">
                  {item.product.product_name} (Blue, 128GB)
                </p>
                {item.product.product_offer > 0 ? (
                  <span className="_pdtPrice_slider">
                    <FontAwesomeIcon icon={faIndianRupeeSign} />
                    $2,00,000{" "}
                    <strike>
                      {" "}
                      <FontAwesomeIcon icon={faIndianRupeeSign} />
                      {item.price}
                    </strike>
                  </span>
                ) : (
                  <span className="_pdtPrice_slider">
                    <FontAwesomeIcon icon={faIndianRupeeSign} />
                    {item.price}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Struct>
  );
}

export default Shop;
