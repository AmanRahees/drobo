import React from "react";
import "./block.css";

function ProductBlock({ images }) {
  return (
    <>
      <div className="flex justify-center">
        <img src={images[0]} className="w-1/2 aspect-square" alt="" />
      </div>
    </>
  );
}

export default ProductBlock;
