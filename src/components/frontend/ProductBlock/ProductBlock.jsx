import React from "react";
import "./block.css";

function ProductBlock({ images }) {
  return (
    <>
      <div className="_pdtBlock_imgs">
        <div className="_remains_imgBox">
          <img src={images[0]} alt="" />
          <img src={images[0]} alt="" />
          <img src={images[1]} alt="" />
          <img src={images[2]} alt="" />
          <img src={images[3]} alt="" />
          <img src={images[0]} alt="" />
          <img src={images[1]} alt="" />
          <img src={images[2]} alt="" />
          <img src={images[3]} alt="" />
        </div>
        <div className="_currPdt_Img">
          <img src={images[0]} alt="" />
        </div>
      </div>
    </>
  );
}

export default ProductBlock;
