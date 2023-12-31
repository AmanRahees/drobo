import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrash,
  faCloudArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import Struct from "../../../components/backend/Struct/Struct";
import iphone from "../../../assets/imgs/iphone15.png";
import Modal from "../../../components/backend/Modal/Modal";
import InlineBox from "../../../components/backend/InlineBox/InlineBox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./category.css";

function Category() {
  const [filter, setFilter] = useState("All");
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const handleDeleteModal = (id, action) => {
    if (action === "open") {
      setDeleteModal(!deleteModal);
      setDeleteId(id);
    } else {
      setDeleteModal(!deleteModal);
      setDeleteId(0);
    }
  };
  const handleCategoryDelete = () => {
    console.log(deleteId);
    setDeleteModal(false);
    toast.error("Invalid Password!");
  };
  return (
    <Struct>
      <button
        className="float-right bg-sub-color py-1 px-3 rounded-md"
        onClick={() => setAddModal(true)}
      >
        Add +
      </button>
      <h1 className="text-3xl md:text-4xl text-sub-color">Category</h1>

      <div className="pl_filter my-4">
        <button
          onClick={() => setFilter("All")}
          className={`${filter === "All" ? "active" : null}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("Newest")}
          className={`${filter === "Newest" ? "active" : null}`}
        >
          Newest
        </button>
        <button
          onClick={() => setFilter("Oldest")}
          className={`${filter === "Oldest" ? "active" : null}`}
        >
          Oldest
        </button>
        <button
          onClick={() => setFilter("Most Used")}
          className={`${filter === "Most Used" ? "active" : null}`}
        >
          Most Used
        </button>
      </div>

      <div className="cbBox">
        <div className="cbItem">
          <img src={iphone} alt="" />
          <div className="cbInfo">
            <div className="float-right flex items-center gap-2">
              <button className="cb_pen" onClick={() => setEditModal(true)}>
                <FontAwesomeIcon icon={faPen} />
              </button>
              <button
                className="cb_trash"
                onClick={() => handleDeleteModal(1, "open")}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
            <h1>Mobile</h1>
          </div>
        </div>
      </div>

      {addModal && (
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
            <button
              onClick={() => handleCategoryDelete()}
              className="bg-red-600"
            >
              Yes
            </button>
          </div>
        </InlineBox>
      )}

      {editModal && (
        <InlineBox>
          <h1 className="inlineBox-heading">Edit Category</h1>
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
            <button onClick={() => setEditModal(false)} className="bg-gray-800">
              Cancel
            </button>
            <button
              onClick={() => handleCategoryDelete()}
              className="bg-red-600"
            >
              Yes
            </button>
          </div>
        </InlineBox>
      )}

      {deleteModal && (
        <Modal>
          <h1 className="modal-heading">Modal Heading</h1>
          <div className="modal-divider"></div>
          <p className="modal-content">Are you that you want to delete this?</p>
          <div className="modal-divider"></div>
          <div className="modal-btns">
            <button
              onClick={() => handleDeleteModal(0, "close")}
              className="bg-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={() => handleCategoryDelete()}
              className="bg-red-600"
            >
              Yes
            </button>
          </div>
        </Modal>
      )}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        pauseOnHover={false}
        theme="dark"
      />
    </Struct>
  );
}

export default Category;
