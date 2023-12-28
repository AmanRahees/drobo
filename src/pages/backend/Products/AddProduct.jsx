import React from "react";
import Struct from "../../../components/backend/Struct/Struct";
import "./product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";

function AddProduct() {
  return (
    <Struct>
      <h1 className="text-3xl md:text-4xl text-sub-color">Add Product</h1>
      <div className="_pdtForm-container">
        <fieldset>
          <legend>Product Information</legend>
          <form className="_pdtForm">
            <div className="_pdtFormWrap">
            <div className="_pdt_1">
              <div className="mb-2">
                <label>Product Name</label>
                <input type="text" />
              </div>
              <div className="mb-2">
                <label>Slug</label>
                <input type="text" readOnly />
              </div>
              <div className="mb-2">
                <label>Description</label>
                <textarea name="" rows="5"></textarea>
              </div>
              <div className="mb-2">
                <label>Category</label>
                <select name="" className="_pdt_select">
                  <option value="">Select an Option</option>
                  <option value="">Aman</option>
                  <option value="">Aman</option>
                  <option value="">Aman</option>
                </select>
              </div>
              <div className="mb-2">
                <label>Brand</label>
                <select name="" className="_pdt_select">
                  <option value="">Select an Option</option>
                  <option value="">Aman</option>
                  <option value="">Aman</option>
                  <option value="">Aman</option>
                </select>
              </div>
            </div>
            <div className="_pdt_2">
              <div className="mb-2">
                <label>Product Image</label>
                <div className="_pdt_nBox">
                  <input type="file" name="" />
                  <div className="text-center">
                    <FontAwesomeIcon
                      className="text-4xl md:text-5xl"
                      icon={faCloudArrowUp}
                    />
                    <span className="text-xs md:text-sm block">
                      Choose a file or Drag it here
                    </span>
                  </div>
                </div>
              </div>
            </div>
            </div>
            <div className="flex flex-col-reverse md:flex-row gap-2 w-full justify-end my-3">
              <button className="px-3 py-1 w-full md:w-auto bg-red-600 rounded-md">
                Cancel
              </button>
              <button className="px-3 py-1 w-full md:w-auto bg-green-500 rounded-md">
                Save
              </button>
            </div>
          </form>
        </fieldset>
      </div>
    </Struct>
  );
}

export default AddProduct;
