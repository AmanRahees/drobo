import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoltLightning,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import DataContainer from "../../../contexts/DataContainer";
import axiosInstance from "../../../services/axios";
import useAxios from "../../../services/useAxios";
import { apiUrl } from "../../../services/constants";
import Struct from "../../../components/frontend/Struct/Struct";
import Loader from "../../../components/Loader/Loader";
import ProductImgBlock from "../../../components/frontend/ProductBlock/ProductBlock";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./product.css";

function ProuductPage() {
  const api = useAxios();
  const { setCartCounter, cartCounter, totalAmount, setTotalAmount } =
    useContext(DataContainer);
  let { id, var_id, slug } = useParams();
  const [productData, setProductData] = useState();
  const [curr_variant, setCurrentVariant] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`/shop/product/${id}`)
      .then((response) => {
        setProductData(response.data);
        setCurrentVariant(
          response.data?.variants.find(
            (variant) => variant.variant_id === +var_id
          )
        );
        setLoading(false);
      })
      .catch((error) => {});
    // eslint-disable-next-line
  }, []);
  const getDefaultImage = (variant) => {
    const defaultImage = variant.images.find((image) => image.default_img);
    return defaultImage ? `${apiUrl}${defaultImage.image}` : "";
  };
  const getDefaultImageForColor = (selectedColor) => {
    const variantWithColor = productData?.variants.find((variant) =>
      variant.attributes.find((attr) => attr.COLOR === selectedColor)
    );
    return getDefaultImage(variantWithColor);
  };
  const color = curr_variant?.attributes.find((attribute) =>
    attribute.hasOwnProperty("COLOR")
  )?.COLOR;
  const storage = curr_variant?.attributes.find((attribute) =>
    attribute.hasOwnProperty("STORAGE")
  )?.STORAGE;
  const ram = curr_variant?.attributes.find((attribute) =>
    attribute.hasOwnProperty("RAM")
  )?.RAM;
  const size = curr_variant?.attributes.find((attribute) =>
    attribute.hasOwnProperty("SIZE")
  )?.SIZE;
  const uniqueColors = [
    ...new Set(
      productData?.variants.map(
        (variant) => variant.attributes.find((attr) => attr.COLOR)?.COLOR
      )
    ),
  ];
  const uniqueStorages = [
    ...new Set(
      productData?.variants.map(
        (variant) => variant.attributes.find((attr) => attr.STORAGE)?.STORAGE
      )
    ),
  ];
  const uniqueRAMs = [
    ...new Set(
      productData?.variants.map(
        (variant) => variant.attributes.find((attr) => attr.RAM)?.RAM
      )
    ),
  ];
  const uniqueSizes = [
    ...new Set(
      productData?.variants.map(
        (variant) => variant.attributes.find((attr) => attr.SIZE)?.SIZE
      )
    ),
  ];
  const handleVariantChange = (selectedVariant) => {
    if (selectedVariant !== undefined) {
      window.location.href = `/shop/${productData.category.toLowerCase()}/${
        productData.id
      }/${slug}/${selectedVariant.variant_id}`;
    } else {
      toast.warning("Combination not Match!");
    }
  };
  const addToCart = () => {
    api
      .post(`cart/${var_id}`)
      .then((response) => {
        if (response.status === 201) {
          toast.success("Added to Cart!");
          setCartCounter(cartCounter + 1);
          setTotalAmount(totalAmount + curr_variant.offer_price);
        } else if (response.status === 200) {
          toast.success("Added to Cart!");
          setTotalAmount(totalAmount + curr_variant.offer_price);
        } else if (response.status === 204) {
          toast.error("Out of Stock!");
        } else if (response.status === 226) {
          toast.warning("Maximum Quantity Reached!");
        }
      })
      .catch((error) => {});
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <Struct>
      <div className="bg-white p-1 md:p-3 rounded-md">
        <div className="_pdt_viewBox">
          <div className="_pdt_imgBlock">
            <ProductImgBlock images={curr_variant?.images} />
          </div>
          <div className="_pdt_detail">
            <p className="_detailName">
              {productData?.product_name}{" "}
              {color && storage && (
                <>
                  ({color}, {storage})
                </>
              )}
              {color && size && (
                <>
                  ({color}, {size})
                </>
              )}
              {color && !size && !storage && <>({color})</>}
              {!color && size && !storage && <>({size})</>}
              {!color && !size && storage && <>({storage})</>}
            </p>
            {curr_variant.max_offer > 0 ? (
              <h1 className="_detailPrice">
                ₹{curr_variant?.offer_price.toLocaleString("en-IN")}{" "}
                <strike>₹{curr_variant?.price.toLocaleString("en-IN")}</strike>{" "}
                <span>{curr_variant.max_offer}%</span>
              </h1>
            ) : (
              <h1 className="_detailPrice">
                ₹{curr_variant?.price.toLocaleString("en-IN")}
              </h1>
            )}

            <div className="_varOption">
              {curr_variant?.attributes.some(
                (attribute) => "COLOR" in attribute
              ) && (
                <>
                  <span className="text-gray-700">
                    Color : <b>{color}</b>
                  </span>
                  <div className="_var_color">
                    {uniqueColors?.map((variant_color, index) => (
                      <button
                        key={index}
                        title={variant_color}
                        className={`${
                          curr_variant.attributes.find(
                            (attr) => attr.COLOR === variant_color
                          )
                            ? "active"
                            : ""
                        }`}
                        disabled={curr_variant.attributes.find(
                          (attr) => attr.COLOR === variant_color
                        )}
                        onClick={() => {
                          const selectedVariant = productData?.variants.find(
                            (variant) => {
                              const hasSameStorage = variant.attributes.some(
                                (attr) =>
                                  attr.STORAGE ===
                                  curr_variant?.attributes.find(
                                    (a) => a.STORAGE
                                  )?.STORAGE
                              );
                              const hasSameRAM = variant.attributes.some(
                                (attr) =>
                                  attr.RAM ===
                                  curr_variant?.attributes.find((a) => a.RAM)
                                    ?.RAM
                              );
                              const hasSameSize = variant.attributes.some(
                                (attr) =>
                                  attr.SIZE ===
                                  curr_variant?.attributes.find((a) => a.SIZE)
                                    ?.SIZE
                              );
                              const hasSameColor = variant.attributes.some(
                                (attr) => attr.COLOR === variant_color
                              );
                              return (
                                hasSameStorage &&
                                hasSameColor &&
                                hasSameRAM &&
                                hasSameSize
                              );
                            }
                          );
                          handleVariantChange(selectedVariant);
                        }}
                      >
                        <img
                          src={getDefaultImageForColor(variant_color)}
                          alt={variant_color}
                          className="w-10 rounded-md"
                        />
                      </button>
                    ))}
                  </div>
                </>
              )}
              {curr_variant?.attributes.some(
                (attribute) => "STORAGE" in attribute
              ) && (
                <>
                  <span className="text-gray-700">
                    Storage : <b>{storage}</b>
                  </span>
                  <div className="_var_memory">
                    {uniqueStorages.map((variant_storage, index) => (
                      <button
                        key={index}
                        className={`${
                          curr_variant.attributes.find(
                            (attr) => attr.STORAGE === variant_storage
                          )
                            ? "active"
                            : ""
                        }`}
                        disabled={curr_variant.attributes.find(
                          (attr) => attr.STORAGE === variant_storage
                        )}
                        onClick={() => {
                          const selectedVariant = productData?.variants.find(
                            (variant) => {
                              const hasSameColor = variant.attributes.some(
                                (attr) =>
                                  attr.COLOR ===
                                  curr_variant?.attributes.find((a) => a.COLOR)
                                    ?.COLOR
                              );
                              const hasSameRAM = variant.attributes.some(
                                (attr) =>
                                  attr.RAM ===
                                  curr_variant?.attributes.find((a) => a.RAM)
                                    ?.RAM
                              );
                              const hasSameSize = variant.attributes.some(
                                (attr) =>
                                  attr.SIZE ===
                                  curr_variant?.attributes.find((a) => a.SIZE)
                                    ?.SIZE
                              );
                              const hasSameStorage = variant.attributes.some(
                                (attr) => attr.STORAGE === variant_storage
                              );
                              return (
                                hasSameStorage &&
                                hasSameColor &&
                                hasSameRAM &&
                                hasSameSize
                              );
                            }
                          );
                          handleVariantChange(selectedVariant);
                        }}
                      >
                        {variant_storage}
                      </button>
                    ))}
                  </div>
                </>
              )}
              {curr_variant?.attributes.some(
                (attribute) => "RAM" in attribute
              ) && (
                <>
                  <span className="text-gray-700">
                    RAM : <b>{ram}</b>
                  </span>
                  <div className="_var_memory">
                    {uniqueRAMs.map((variant_ram, index) => (
                      <button
                        key={index}
                        className={`${
                          curr_variant.attributes.find(
                            (attr) => attr.RAM === variant_ram
                          )
                            ? "active"
                            : ""
                        }`}
                        disabled={curr_variant.attributes.find(
                          (attr) => attr.RAM === variant_ram
                        )}
                        onClick={() => {
                          const selectedVariant = productData?.variants.find(
                            (variant) => {
                              const hasSameStorage = variant.attributes.some(
                                (attr) =>
                                  attr.STORAGE ===
                                  curr_variant?.attributes.find(
                                    (a) => a.STORAGE
                                  )?.STORAGE
                              );
                              const hasSameColor = variant.attributes.some(
                                (attr) =>
                                  attr.COLOR ===
                                  curr_variant?.attributes.find((a) => a.COLOR)
                                    ?.COLOR
                              );
                              const hasSameSize = variant.attributes.some(
                                (attr) =>
                                  attr.SIZE ===
                                  curr_variant?.attributes.find((a) => a.SIZE)
                                    ?.SIZE
                              );
                              const hasSameRAM = variant.attributes.some(
                                (attr) => attr.RAM === variant_ram
                              );
                              return (
                                hasSameStorage &&
                                hasSameColor &&
                                hasSameRAM &&
                                hasSameSize
                              );
                            }
                          );
                          handleVariantChange(selectedVariant);
                        }}
                      >
                        {variant_ram}
                      </button>
                    ))}
                  </div>
                </>
              )}
              {curr_variant?.attributes.some(
                (attribute) => "SIZE" in attribute
              ) && (
                <>
                  <span className="text-gray-700">
                    Size : <b>{size}</b>
                  </span>
                  <div className="_var_memory">
                    {uniqueSizes.map((variant_size, index) => (
                      <button
                        key={index}
                        className={`${
                          curr_variant.attributes.find(
                            (attr) => attr.SIZE === variant_size
                          )
                            ? "active"
                            : ""
                        }`}
                        disabled={curr_variant.attributes.find(
                          (attr) => attr.SIZE === variant_size
                        )}
                        onClick={() => {
                          const selectedVariant = productData?.variants.find(
                            (variant) => {
                              const hasSameStorage = variant.attributes.some(
                                (attr) =>
                                  attr.STORAGE ===
                                  curr_variant?.attributes.find(
                                    (a) => a.STORAGE
                                  )?.STORAGE
                              );
                              const hasSameRAM = variant.attributes.some(
                                (attr) =>
                                  attr.RAM ===
                                  curr_variant?.attributes.find((a) => a.RAM)
                                    ?.RAM
                              );
                              const hasSameColor = variant.attributes.some(
                                (attr) =>
                                  attr.COLOR ===
                                  curr_variant?.attributes.find((a) => a.COLOR)
                                    ?.COLOR
                              );
                              const hasSameSize = variant.attributes.some(
                                (attr) => attr.SIZE === variant_size
                              );
                              return (
                                hasSameStorage &&
                                hasSameColor &&
                                hasSameRAM &&
                                hasSameSize
                              );
                            }
                          );
                          handleVariantChange(selectedVariant);
                        }}
                      >
                        {variant_size}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className="flex items-center gap-3 my-3">
              <b className="text-gray-700">Brand</b>
              <img
                src={`${apiUrl}${productData?.brand.brand_image}`}
                alt={productData?.brand.brand_name}
                title={productData?.brand.brand_name}
                className="w-10 rounded-md"
              />
            </div>
            {curr_variant?.stock <= 0 && (
              <span className="block text-red-600">Out of Stock!</span>
            )}
            {curr_variant?.stock >= 1 && curr_variant?.stock <= 10 && (
              <span className="block text-yellow-600">
                Only {curr_variant?.stock} left!
              </span>
            )}
            <div className="flex gap-2 my-5">
              <button
                onClick={addToCart}
                disabled={curr_variant?.stock <= 0}
                className={`${
                  curr_variant?.stock <= 0 ? "bg-gray-400" : "bg-primary-color"
                } text-white w-1/2 md:w-1/3 py-3 text-sm md:text-base rounded-md`}
              >
                <FontAwesomeIcon icon={faCartShopping} className="mr-3" />
                Add to Cart
              </button>
              <button className="bg-gray-700 text-white w-1/2 md:w-1/3 py-3 text-sm md:text-base rounded-md">
                <FontAwesomeIcon icon={faBoltLightning} className="mr-3" />
                Buy Now
              </button>
            </div>
          </div>
        </div>
        <div className="my-2 px-3 md:px-16">
          <h1 className="block mt-3 text-primary-color text-xl md:text-4xl">
            Description
          </h1>
          <p className="description_ mb-5">{productData?.description}</p>
        </div>
        <hr />
        <div className="my-3 md:my-6 px-3 md:px-16">
          <h1 className="text-xl md:text-4xl text-primary-color">
            Related Products
          </h1>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
    </Struct>
  );
}

export default ProuductPage;
