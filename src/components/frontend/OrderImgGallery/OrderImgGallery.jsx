import React from "react";
import { apiUrl } from "../../../services/constants";

const OrderImgGallery = ({ images, maxVisibleCount }) => {
  const visibleImages = images.slice(0, maxVisibleCount);
  const additionalImageCount = images.length - maxVisibleCount;
  return (
    <div className="flex gap-2">
      {visibleImages.map((imageUrl, index) => (
        // eslint-disable-next-line
        <img
          key={index}
          src={apiUrl + imageUrl}
          alt={`Image ${index}`}
          className="w-[60px] md:w-[80px]"
        />
      ))}
      {additionalImageCount > 0 && (
        <div className="w-[60px] md:w-[80px] relative">
          {/* eslint-disable-next-line */}
          <img
            src={apiUrl + images[maxVisibleCount]}
            alt={`Image preview`}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center text-white font-bold"
            style={{ background: "#00000066" }}
          >
            +{additionalImageCount}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderImgGallery;
