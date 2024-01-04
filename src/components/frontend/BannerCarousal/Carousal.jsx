import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import "./carousal.css";

const Carousal = ({ banners }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? banners.length - 1 : prevIndex - 1
    );
  };
  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === banners.length ? 0 : prevIndex + 1
    );
  }, [banners]);
  const handleDot = (index) => {
    setCurrentIndex(index);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [handleNext]);
  return (
    <div className="_banner_carousal">
      <div className="carousal_items">
        {banners.map((banner, index) => (
          <Link key={index}>
            <img
              src={banner}
              className={currentIndex === index ? "active" : "inactive"}
              alt={banner}
            />
          </Link>
        ))}
      </div>
      <div className="_banner_contols">
        <button className="bnr_next_" onClick={() => handlePrevious()}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <button className="bnr_prev_" onClick={() => handleNext()}>
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      </div>
      <div className="carousal_indicator">
        {banners.map((_, index) => (
          <div
            key={index}
            onClick={() => handleDot(index)}
            className={`bnr_dot ${currentIndex === index ? "active" : ""}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousal;
