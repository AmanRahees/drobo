import React from "react";
import Modal from "../../../components/backend/Modal/Modal";
import useAxios from "../../../services/useAxios";

function DeleteProduct({
  selectedIds,
  setSelected,
  setDeleteModal,
  setProductsData,
  hanldeToastMessages,
}) {
  const api = useAxios();
  const handleProductsDelete = () => {
    setDeleteModal(false);
    api
      .delete("admin/products", { data: selectedIds })
      .then((response) => {
        setProductsData((prevProduct) =>
          prevProduct.filter((product) => !selectedIds.includes(product.id))
        );
        setSelected([]);
        hanldeToastMessages("success", "Deleted Successfull!");
      })
      .catch((error) => {
        hanldeToastMessages("error", "Error Occured!");
      });
  };
  return (
    <Modal>
      <h1 className="modal-heading">Delete Product</h1>
      <div className="modal-divider"></div>
      <p className="modal-content">
        Are you sure that you want to delete this Products?
      </p>
      <div className="modal-divider"></div>
      <div className="modal-btns">
        <button onClick={() => setDeleteModal(false)} className="bg-gray-800">
          Cancel
        </button>
        <button onClick={() => handleProductsDelete()} className="bg-red-600">
          Yes
        </button>
      </div>
    </Modal>
  );
}

export default DeleteProduct;
