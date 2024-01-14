import React, { useState } from "react";
import { apiUrl } from "../../../services/constants";
import "./block.css";

function ProductBlock({ images }) {
  const [counter, setCounter] = useState(0);
  return (
    <>
      <div className="_pdtBlock_imgs">
        <div className="_remains_imgBox">
          {images?.map((image, index) => (
            <img
              key={index}
              src={apiUrl + image.image}
              onClick={() => setCounter(index)}
              className={`${
                counter === index ? "border border-teal-600" : "border"
              }`}
              alt=""
            />
          ))}
        </div>
        <div className="_currPdt_Img border">
          <img src={images ? apiUrl + images[counter]?.image : null} alt="" />
        </div>
      </div>
    </>
  );
}

export default ProductBlock;
