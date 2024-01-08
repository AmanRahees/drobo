import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp, faClose } from "@fortawesome/free-solid-svg-icons";
import useAxios from "../../../services/useAxios";
import { apiUrl } from "../../../services/constants";
import InlineBox from "../../../components/backend/InlineBox/InlineBox";

function EditBrands({
  selectedId,
  setEditModal,
  setBrandsData,
  brandsData,
  hanldeToastMessages,
}) {
  const api = useAxios();
  const selectedValues = brandsData.find((brand) => brand.id === selectedId);
  const [formData, setFormData] = useState({
    brand_name: selectedValues.brand_name,
    brand_image: selectedValues.brand_image,
    status: selectedValues.status,
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const handleEditBrand = () => {
    api
      .put(`admin/brand/${selectedId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          const updatedData = brandsData.map((item) =>
            item.id === selectedId ? { ...item, ...response.data } : item
          );
          setBrandsData(updatedData);
          setEditModal(false);
          hanldeToastMessages("success", "Updated Successfully!");
        }
      })
      .catch((error) => {
        hanldeToastMessages("error", "Something went wrong!");
      });
  };
  const handleImageChange = (e) => {
    const name = e.target.name;
    const file = e.target.files[0];
    setFormData((prevFormData) => ({ ...prevFormData, [name]: file }));
  };
  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, status: e.target.checked });
  };
  return (
    <InlineBox>
      <h1 className="inlineBox-heading">Edit Brand</h1>
      <div className="modal-divider"></div>
      <div className="inlineBox-content">
        <div className="inlineForm">
          <div className="relative mb-3">
            <label className="block mb-2">Brand Name</label>
            <input
              type="text"
              name="brand_name"
              onChange={handleInputChange}
              value={formData.brand_name}
            />
          </div>
          <div className="relative mb-3">
            <label className="block mb-2">Brand Image</label>
            {!formData.brand_image ? (
              <div className="inline_ImageBox">
                <input
                  type="file"
                  accept="image/*"
                  name="brand_image"
                  onChange={handleImageChange}
                />
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
            ) : (
              <div className="inline_ImageBox active">
                <button
                  type="submit"
                  className="inline_ImageBox_btn"
                  onClick={() =>
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      brand_image: null,
                    }))
                  }
                >
                  <FontAwesomeIcon icon={faClose} />
                </button>
                <img
                  src={
                    typeof formData.brand_image === "string"
                      ? `${apiUrl}${formData.brand_image}`
                      : URL.createObjectURL(formData.brand_image)
                  }
                  alt={formData.brand_image.name}
                />
              </div>
            )}
          </div>
          <div className="relative flex items-center gap-3 mb-3">
            <label>Status :</label>
            <input
              type="checkbox"
              name="status"
              onChange={handleCheckboxChange}
              checked={formData.status}
              className="togglerInput"
            />
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
        <button
          type="button"
          onClick={() => handleEditBrand()}
          className="bg-red-600"
        >
          Yes
        </button>
      </div>
    </InlineBox>
  );
}

export default EditBrands;
