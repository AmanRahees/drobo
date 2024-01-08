import React from "react";
import { useNavigate } from "react-router-dom";
import "./slider.css";

const ProductSlider = ({ heading, products }) => {
  const navigate = useNavigate();
  return (
    <div className="_pdt_slider">
      <h1 className="text-xl md:text-3xl text-primary-color">{heading}</h1>
      <div id="carouselExampleControls" className="_pdt_sliderBox">
        {products.map((product, index) => (
          <div
            key={index}
            className="_pdt_sliderItem shadow-md shadow-gray-200"
            onClick={() => navigate(`/${index}`)}
          >
            <span className="_pdtTop_slider">40%</span>
            <img src={product} alt="" />
            <div className="py-2 px-3">
              <p className="_pdtName_slider">Galaxy S22 Ultra (Blue, 128GB)</p>
              <span className="_pdtPrice_slider">
                $2,00,000 <strike>$2,00,000</strike>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSlider;
