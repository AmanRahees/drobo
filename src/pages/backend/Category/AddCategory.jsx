import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import InlineBox from "../../../components/backend/InlineBox/InlineBox";

function AddCategory({ setAddModal, handleCategoryDelete }) {
  return (
    <InlineBox>
      <h1 className="inlineBox-heading">Add Category</h1>
      <div className="modal-divider"></div>
      <p className="inlineBox-content">
        <form className="inlineForm">
          <div className="relative mb-3">
            <label className="block mb-2">Category Name</label>
            <input type="text" />
          </div>
          <div className="relative mb-3">
            <label className="block mb-2">Category Image</label>
            <div className="inline_ImageBox">
              <input type="file" />
              <div className="flex justify-center flex-col gap-3">
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
          <div className="relative flex items-center gap-3 mb-3">
            <label>Status :</label>
            <input type="checkbox" className="togglerInput" />
          </div>
        </form>
      </p>
      <div className="modal-divider"></div>
      <div className="modal-btns">
        <button onClick={() => setAddModal(false)} className="bg-gray-800">
          Cancel
        </button>
        <button onClick={() => handleCategoryDelete()} className="bg-red-600">
          Yes
        </button>
      </div>
    </InlineBox>
  );
}

export default AddCategory;
