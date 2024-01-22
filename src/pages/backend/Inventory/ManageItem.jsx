import React, { useState } from "react";
import useAxios from "../../../services/useAxios";
import { apiUrl } from "../../../services/constants";
import InlineBox from "../../../components/backend/InlineBox/InlineBox";

function ManageItem({ setEditModal, selectedId, inventory, setInventory }) {
  const api = useAxios();
  const selectedValues = inventory.find((product) => product.id === selectedId);
  const [formData, setFormData] = useState({
    price: selectedValues.price,
    stock: selectedValues.stock,
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleIncrement = () => {
    setFormData({ ...formData, stock: formData.stock + 1 });
  };
  const handleDecrement = () => {
    setFormData({ ...formData, stock: formData.stock - 1 });
  };
  const handleFormSubmit = () => {
    api
      .put(`admin/variants/${selectedId}`, formData)
      .then((response) => {
        if (response.status === 200) {
          const updateTheData = inventory.map((item) =>
            item.id === selectedId ? { ...item, ...response.data } : item
          );
          setInventory(updateTheData);
          setEditModal(false);
        }
      })
      .catch((error) => {});
  };
  return (
    <InlineBox>
      <h1 className="inlineBox-heading">Inventory Item</h1>
      <div className="modal-divider"></div>
      <div className="inlineBox-content">
        <div className="inlineForm">
          <div className="relative mb-3">
            <img
              src={apiUrl + selectedValues.image}
              alt=""
              className="w-[200px] mx-auto rounded-md"
            />
            <div className="w-[200px] mx-auto">
              <p className="text-ellipsis line-clamp-2 text-cyan-400">
                {selectedValues?.product}
              </p>
              <small className="text-gray-400">
                (
                {Object.entries(selectedValues.product_attributes).map(
                  ([attr, value], index) => (
                    <span key={index}>
                      {index !== 0 && ", "}
                      {value}
                    </span>
                  )
                )}
                )
              </small>
            </div>
          </div>
          <div className="relative mb-3">
            <label className="block mb-2">&#8377;Price</label>
            <input
              type="text"
              name="price"
              onChange={handleInputChange}
              value={formData.price}
            />
          </div>
          <div className="relative mb-3">
            <label className="block mb-2">Stock</label>
            <div className="flex overflow-hidden rounded-md w-max">
              <button
                onClick={handleDecrement}
                className="bg-gray-600 py-2 px-3"
              >
                -
              </button>
              <input
                type="text"
                name="stock"
                onChange={handleInputChange}
                value={formData.stock}
                style={{
                  width: "50px",
                  borderRadius: "0",
                  padding: "0",
                  textAlign: "center",
                  border: "1px solid #333",
                  outline: "none",
                }}
              />
              <button
                onClick={handleIncrement}
                className="bg-gray-600 py-1 px-3"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-divider"></div>
      <div className="modal-btns">
        <button
          type="button"
          onClick={() => setEditModal(false)}
          className="bg-gray-800"
        >
          Cancel
        </button>
        <button onClick={handleFormSubmit} type="button" className="bg-red-600">
          Save
        </button>
      </div>
    </InlineBox>
  );
}

export default ManageItem;
