import React from "react";
import useAxios from "../../../services/useAxios";
import Modal from "../../../components/backend/Modal/Modal";

const DeleteVariant = (
  selectedIds,
  setSelected,
  setDeleteModal,
  setVariants,
  hanldeToastMessages
) => {
  const api = useAxios();
  const handleVariantsDelete = () => {
    setDeleteModal(false);
    setVariants((prevVariants) =>
      prevVariants.filter((variant) => !selectedIds.includes(variant.id))
    );
    setSelected([]);
  };
  return (
    <Modal>
      <h1 className="modal-heading">Delete Product</h1>
      <div className="modal-divider"></div>
      <p className="modal-content">
        Are you sure that you want to delete this Variant?
      </p>
      <div className="modal-divider"></div>
      <div className="modal-btns">
        <button onClick={() => setDeleteModal(false)} className="bg-gray-800">
          Cancel
        </button>
        <button onClick={() => handleVariantsDelete()} className="bg-red-600">
          Yes
        </button>
      </div>
    </Modal>
  );
};

export default DeleteVariant;
