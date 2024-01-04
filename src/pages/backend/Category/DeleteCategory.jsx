import React from "react";
import Modal from "../../../components/backend/Modal/Modal";
import useAxios from "../../../services/useAxios";

function DeleteCategory({
  selectedId,
  setDeleteModal,
  hanldeToastMessages,
  setCategoryData,
}) {
  const api = useAxios();
  const handleDelteCategory = () => {
    api
      .delete(`admin/category/${selectedId}`)
      .then((response) => {
        if (response.status === 200) {
          setCategoryData((prevCategory) =>
            prevCategory.filter((category) => category.id !== selectedId)
          );
          hanldeToastMessages("success", "Category Deleted!");
        }
      })
      .catch((error) => {
        hanldeToastMessages("error", "Error Occured, Try Again!");
      });
    setDeleteModal(false);
  };
  return (
    <Modal>
      <h1 className="modal-heading">Modal Heading</h1>
      <div className="modal-divider"></div>
      <p className="modal-content">Are you that you want to delete this?</p>
      <div className="modal-divider"></div>
      <div className="modal-btns">
        <button onClick={() => setDeleteModal(false)} className="bg-gray-800">
          Cancel
        </button>
        <button onClick={() => handleDelteCategory()} className="bg-red-600">
          Yes
        </button>
      </div>
    </Modal>
  );
}

export default DeleteCategory;
