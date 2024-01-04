import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp, faClose } from "@fortawesome/free-solid-svg-icons";
import useAxios from "../../../services/useAxios";
import { apiUrl } from "../../../services/constants";
import InlineBox from "../../../components/backend/InlineBox/InlineBox";

function EditCategory({
  selectedId,
  setEditModal,
  setCategoryData,
  categoryData,
  hanldeToastMessages,
}) {
  const api = useAxios();
  const selectedValues = categoryData.find(
    (category) => category.id === selectedId
  );
  const [formData, setFormData] = useState({
    category_name: selectedValues.category_name,
    category_image: selectedValues.category_image,
    status: selectedValues.status,
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const handleEditCategory = () => {
    api
      .put(`admin/category/${selectedId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          const updateTheData = categoryData.map((item) =>
            item.id === selectedId ? { ...item, ...response.data } : item
          );
          console.log(updateTheData);
          setCategoryData(updateTheData);
          setEditModal(false);
          hanldeToastMessages("success", "Updated Successfully!");
        }
      })
      .catch((error) => {
        console.log(error);
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
      <h1 className="inlineBox-heading">Add Category</h1>
      <div className="modal-divider"></div>
      <div className="inlineBox-content">
        <div className="inlineForm">
          <div className="relative mb-3">
            <label className="block mb-2">Category Name</label>
            <input
              type="text"
              name="category_name"
              onChange={handleInputChange}
              value={formData.category_name}
            />
          </div>
          <div className="relative mb-3">
            <label className="block mb-2">Category Image</label>
            {!formData.category_image ? (
              <div className="inline_ImageBox">
                <input
                  type="file"
                  accept="image/*"
                  name="category_image"
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
                      category_image: null,
                    }))
                  }
                >
                  <FontAwesomeIcon icon={faClose} />
                </button>
                <img
                  src={
                    typeof formData.category_image === "string"
                      ? `${apiUrl}${formData.category_image}`
                      : URL.createObjectURL(formData.category_image)
                  }
                  alt={formData.category_image.name}
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
          onClick={() => handleEditCategory()}
          className="bg-red-600"
        >
          Yes
        </button>
      </div>
    </InlineBox>
  );
}

export default EditCategory;
