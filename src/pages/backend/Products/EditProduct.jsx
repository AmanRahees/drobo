import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import useAxios from "../../../services/useAxios";
import { apiUrl } from "../../../services/constants";
import Struct from "../../../components/backend/Struct/Struct";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./product.css";

function EditProduct() {
  const api = useAxios();
  const navigate = useNavigate();
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [formData, setFormData] = useState({
    product_name: "",
    slug: "",
    base_image: null,
    description: "NA",
    category: 0,
    brand: 0,
    status: false,
  });
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "-")
      .replace(/--+/g, "-")
      .replace(/^-+/, "-")
      .replace(/-+$/, "-");
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    if (name === "product_name") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        slug: generateSlug(value),
      }));
    }
  };
  const handleImageChange = (e) => {
    const name = e.target.name;
    const file = e.target.files[0];
    setFormData((prevFormData) => ({ ...prevFormData, [name]: file }));
  };
  const handleCheckBoxChange = (e) => {
    setFormData({ ...formData, status: e.target.checked });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.category === 0 || formData.brand === 0) {
      toast.error("Every Field is Required!");
    } else {
      api
        .put(`admin/products/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.status === 200) {
            navigate("./..");
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("Something went wrong!");
        });
    }
  };
  useEffect(() => {
    api
      .get(`admin/products/${id}`)
      .then((response) => {
        let data = response.data;
        setFormData({
          product_name: data.product_name,
          slug: data.slug,
          base_image: data.base_image,
          description: data.description,
          category: data.category,
          brand: data.brand,
          status: data.status,
        });
      })
      .catch((error) => {
        toast.error("Failed to fetch Data!");
      });
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    api
      .get("admin/get-descriptors")
      .then((response) => {
        setCategories(response.data.categories);
        setBrands(response.data.brands);
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line
  }, []);
  return (
    <Struct>
      <h1 className="text-3xl md:text-4xl text-sub-color">Edit Product</h1>
      <div className="flex justify-end items-center gap-2">
        Status:
        <input
          type="checkbox"
          onChange={handleCheckBoxChange}
          checked={formData.status}
          className="togglerInput"
        />
      </div>
      <div className="_pdtForm-container">
        <fieldset>
          <legend>Product Information</legend>
          <form
            onSubmit={handleFormSubmit}
            className="_pdtForm"
            encType="multipart/form-data"
          >
            <div className="_pdtFormWrap">
              <div className="_pdt_1">
                <div className="mb-2">
                  <label>Product Name</label>
                  <input
                    type="text"
                    name="product_name"
                    onChange={handleInputChange}
                    value={formData.product_name}
                  />
                </div>
                <div className="mb-2">
                  <label>Slug</label>
                  <input type="text" value={formData.slug} disabled />
                </div>
                <div className="mb-2">
                  <label>Description</label>
                  <textarea
                    name="description"
                    onChange={handleInputChange}
                    value={formData.description}
                    rows="5"
                  ></textarea>
                </div>
                <div className="mb-2">
                  <label>Category</label>
                  <select
                    name="category"
                    onChange={handleInputChange}
                    value={formData.category.id}
                    className="_pdt_select"
                  >
                    {categories.map((category, index) => (
                      <option key={index} value={category.id}>
                        {category.category_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-2">
                  <label>Brand (Optional)</label>
                  <select
                    name="brand"
                    onChange={handleInputChange}
                    value={formData.brand.id}
                    className="_pdt_select"
                  >
                    {brands.map((brand) => (
                      <option key={brand.id} value={brand.id}>
                        {brand.brand_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="_pdt_2">
                <div className="mb-2">
                  <label>Product Image</label>
                  {!formData.base_image ? (
                    <div className="_pdt_nBox">
                      <input
                        type="file"
                        accept="image/*"
                        name="base_image"
                        onChange={handleImageChange}
                      />
                      <div className="text-center">
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
                    <div
                      className={`${
                        formData.base_image ? "_pdt_nBox active" : ""
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prevFormData) => ({
                            ...prevFormData,
                            base_image: null,
                          }))
                        }
                        className="absolute right-0 p-2 px-3 bg-red-600"
                      >
                        X
                      </button>
                      <img
                        src={
                          typeof formData.base_image === "string"
                            ? `${apiUrl}${formData.base_image}`
                            : URL.createObjectURL(formData.base_image)
                        }
                        alt={formData.base_image.name}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col-reverse md:flex-row gap-2 w-full justify-end my-3">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-3 py-1 w-full md:w-auto bg-red-600 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 w-full md:w-auto bg-green-500 rounded-md"
              >
                Save
              </button>
            </div>
          </form>
        </fieldset>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnHover={false}
        theme="dark"
      />
    </Struct>
  );
}

export default EditProduct;
