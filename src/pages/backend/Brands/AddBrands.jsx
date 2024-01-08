import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import useAxios from "../../../services/useAxios";
import InlineBox from "../../../components/backend/InlineBox/InlineBox";

function AddBrands({ setAddModal, hanldeToastMessages, setBrandsData }) {
  const api = useAxios();
  const [formData, setFormData] = useState({
    brand_name: "",
    brand_image: null,
    brand_offer: 0,
    status: true,
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const HandleAddBrand = async () => {
    await api
      .post("admin/brand", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.status === 201) {
          setBrandsData((prevBrands) => [...prevBrands, response.data]);
          hanldeToastMessages("success", "Brand Added Successfully!");
          setAddModal(false);
        } else {
          hanldeToastMessages("error", "Something went Wrong!");
        }
      })
      .catch((error) => {
        hanldeToastMessages("error", "Something went Wrong!");
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
      <h1 className="inlineBox-heading">Add Brand</h1>
      <div className="modal-divider"></div>
      <div className="inlineBox-content">
        <form className="inlineForm">
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
                  src={URL.createObjectURL(formData.brand_image)}
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
        </form>
      </div>
      <div className="modal-divider"></div>
      <div className="modal-btns">
        <button
          type="button"
          onClick={() => setAddModal(false)}
          className="bg-gray-800"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => HandleAddBrand()}
          className="bg-red-600"
        >
          Yes
        </button>
      </div>
    </InlineBox>
  );
}

export default AddBrands;
