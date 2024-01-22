import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAxios from "../../../services/useAxios";
import Struct from "../../../components/backend/Struct/Struct";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./banners.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faImage } from "@fortawesome/free-solid-svg-icons";

function AddBanner() {
  const api = useAxios();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    banner: null,
    url_path: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const handleImageChange = (e) => {
    const name = e.target.name;
    const file = e.target.files[0];
    setFormData((prevFormData) => ({ ...prevFormData, [name]: file }));
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.banner !== null && formData.url_path !== "") {
      api
        .post("admin/banners", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          navigate(-1);
        })
        .catch((error) => {
          toast.error("Error Occured!");
        });
    } else {
      toast.error("Invalid Entry!");
    }
  };
  return (
    <Struct>
      <div className="float-right flex flex-col-reverse md:flex-row gap-2 mb-2">
        <Link className="bg-sub-color py-1 px-3 rounded-md" to={-1}>
          Go Back &rarr;
        </Link>
      </div>
      <h1 className="text-3xl md:text-4xl">Add Banners</h1>

      <div className="my-10">
        <form onSubmit={handleFormSubmit}>
          <div className="relative w-full h-80">
            {formData.banner === null ? (
              <div className="flex justify-center items-center h-full border border-gray-700 border-dashed">
                <input
                  type="file"
                  name="banner"
                  onChange={handleImageChange}
                  className="absolute w-full h-full opacity-0"
                />
                <div className="text-center">
                  <FontAwesomeIcon icon={faImage} className="text-[70px]" />
                  <p className="font-bold">Choose or Drop image here</p>
                </div>
              </div>
            ) : (
              <div className="w-full h-full relative">
                <div className="absolute top-2 right-2">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        banner: null,
                      }))
                    }
                    className="bg-red-600 text-white px-2 py-1 rounded-md relative"
                  >
                    <FontAwesomeIcon icon={faClose} />
                  </button>
                </div>
                <img
                  src={URL.createObjectURL(formData.banner)}
                  alt={formData.banner.name}
                  className="w-full h-full"
                />
              </div>
            )}
          </div>
          <div className="relative flex items-center gap-3 my-3">
            <label className="">URL:</label>
            <input
              type="url"
              name="url_path"
              onChange={handleInputChange}
              value={formData.url_path}
              className="bg-transparent p-2 w-full md:w-3/4 outline-none border border-gray-700 rounded"
            />
          </div>
          <div className="flex justify-end">
            <button className="bg-green-600 px-3 py-1 rounded">Save</button>
          </div>
        </form>
      </div>
    </Struct>
  );
}

export default AddBanner;
