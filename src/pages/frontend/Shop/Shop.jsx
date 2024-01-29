import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../services/axios";
import { apiUrl } from "../../../services/constants";
import Struct from "../../../components/frontend/Struct/Struct";
import Loader from "../../../components/Loader/Loader";
import "./shop.css";

function Shop() {
  const navigate = useNavigate();
  const pageSize = 30;
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  useEffect(() => {
    axiosInstance
      .get(`shop/products?page=${page}`)
      .then((response) => {
        setProductsData(response.data.results);
        setTotalItems(response.data.count);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page]);
  const getTotalPages = () => Math.ceil(totalItems / pageSize);
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= getTotalPages()) {
      setPage(newPage);
    }
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <Struct>
      <div className="_shop-container">
        {/* <div className="_shop-filterBox">
          <FilterBox />
        </div> */}
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
              {item.max_offer > 0 && (
                <span className="_pdtTop_slider">{item.max_offer}%</span>
              )}
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
                {item.max_offer > 0 ? (
                  <p className="_pdtPrice_slider">
                    <span className="text-green-700">
                      ₹{item.offer_price.toLocaleString("en-IN")}{" "}
                    </span>
                    <strike> ₹{item.price.toLocaleString("en-IN")}</strike>
                  </p>
                ) : (
                  <span className="_pdtPrice_slider">
                    ₹{item.price.toLocaleString("en-IN")}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
        {page > 1 && (
          <div className="flex justify-center gap-3 my-3">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="md:p-2 bg-primary-color text-white w-[30px] h-[30px] md:w-[40px] md:h-[40px]"
            >
              {"<"}
            </button>
            {Array.from({ length: getTotalPages() }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                style={{ fontWeight: page === index + 1 ? "bold" : "normal" }}
                className={`${
                  page === index + 1 ? "bg-teal-600" : "bg-primary-color"
                } w-[30px] h-[30px] md:w-[40px] md:h-[40px] text-white text-xs md:text-lg`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === getTotalPages()}
              className="bg-primary-color text-white w-[30px] h-[30px] md:w-[40px] md:h-[40px]"
            >
              {">"}
            </button>
          </div>
        )}
      </div>
    </Struct>
  );
}

export default Shop;
