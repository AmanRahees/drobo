import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../contexts/AuthContext";
import axiosInstance from "../../../services/axios";
import { apiUrl } from "../../../services/constants";
import Struct from "../../../components/frontend/Struct/Struct";
import FilterBox from "../../../components/frontend/FilterBox/FilterBox";
import "./shop.css";

function Shop() {
  const { setLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [productsData, setProductsData] = useState([]);
  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get("shop/products")
      .then((response) => {
        setProductsData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);
  }, [setLoading]);
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
              <div className="p-3">
                <img
                  src={`${apiUrl}${
                    item.images.find((img) => img.default_img === true)?.image
                  }`}
                  alt={
                    item.images.find((img) => img.default_img === true)?.image
                      .name
                  }
                />
              </div>
              <div className="py-2 px-3">
                <h1 className="_pdtName_slider text-primary-color capitalize">
                  {item.product.product_name}{" "}
                  {item.product_attributes.COLOR &&
                    item.product_attributes.STORAGE && (
                      <>
                        ({item.product_attributes.COLOR},{" "}
                        {item.product_attributes.STORAGE})
                      </>
                    )}
                  {item.product_attributes.COLOR &&
                    item.product_attributes.SIZE && (
                      <>
                        ({item.product_attributes.COLOR},{" "}
                        {item.product_attributes.SIZE})
                      </>
                    )}
                  {item.product_attributes.COLOR &&
                    !item.product_attributes.SIZE &&
                    !item.product_attributes.STORAGE && (
                      <>({item.product_attributes.COLOR})</>
                    )}
                  {!item.product_attributes.COLOR &&
                    item.product_attributes.SIZE &&
                    !item.product_attributes.STORAGE && (
                      <>({item.product_attributes.SIZE})</>
                    )}
                  {!item.product_attributes.COLOR &&
                    !item.product_attributes.SIZE &&
                    item.product_attributes.STORAGE && (
                      <>({item.product_attributes.STORAGE})</>
                    )}
                </h1>
                {item.product.product_offer > 0 ? (
                  <span className="_pdtPrice_slider">
                    ₹2,00,000 <strike> ₹{item.price}</strike>
                  </span>
                ) : (
                  <span className="_pdtPrice_slider">
                    ₹{item.price.toLocaleString("en-IN")}
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
