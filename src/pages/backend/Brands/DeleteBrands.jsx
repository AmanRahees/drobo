import React from "react";
import Modal from "../../../components/backend/Modal/Modal";
import useAxios from "../../../services/useAxios";

function DeleteBrands({
  selectedId,
  setDeleteModal,
  hanldeToastMessages,
  setBrandsData,
}) {
  const api = useAxios();
  const handleDeleteBrand = () => {
    api
      .delete(`admin/brand/${selectedId}`)
      .then((response) => {
        if (response.status === 200) {
          setBrandsData((prevBrands) =>
            prevBrands.filter((brand) => brand.id !== selectedId)
          );
          hanldeToastMessages("success", "Brand Deleted!");
        }
      })
      .catch((error) => {
        hanldeToastMessages("error", "Error Occured, Try Again!");
      });
    setDeleteModal(false);
  };
  return (
    <Modal>
      <h1 className="modal-heading">Delete Brand</h1>
      <div className="modal-divider"></div>
      <p className="modal-content">Are you that you want to delete this?</p>
      <div className="modal-divider"></div>
      <div className="modal-btns">
        <button onClick={() => setDeleteModal(false)} className="bg-gray-800">
          Cancel
        </button>
        <button onClick={() => handleDeleteBrand()} className="bg-red-600">
          Yes
        </button>
      </div>
    </Modal>
  );
}

export default DeleteBrands;
