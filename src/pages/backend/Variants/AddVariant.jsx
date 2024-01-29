import React, { useEffect, useState, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import AuthContext from "../../../contexts/AuthContext";
import useAxios from "../../../services/useAxios";
import Struct from "../../../components/backend/Struct/Struct";
import Modal from "../../../components/backend/Modal/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faImage,
  faInr,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./variants.css";

function AddVariant() {
  const api = useAxios();
  const navigate = useNavigate();
  const { setLoading } = useContext(AuthContext);
  const { id } = useParams();
  const [idCount, setIdCount] = useState(1);
  const [imageCount, setImageCount] = useState(1);
  const [product, setProduct] = useState();
  const [productAttrs, setProductAttrs] = useState([]);
  const [showFields, setShowFields] = useState(false);
  const [productVariants, setProductVariants] = useState([
    {
      id: 0,
      product: id,
      product_attributes: [],
      price: 100,
      stock: 10,
      status: true,
    },
  ]);
  const [productImages, setProductImages] = useState([
    {
      id: 0,
      image: null,
      default_img: true,
    },
  ]);
  useEffect(() => {
    setLoading(true);
    api.get(`admin/products/${id}`).then((response) => {
      setProduct(response.data);
    });
    setLoading(false);
    // eslint-disable-next-line
  }, []);
  const handleAttrChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setProductAttrs([...productAttrs, value]);
    } else {
      setProductAttrs(productAttrs.filter((item) => item !== value));
    }
  };
  const handleAttrSubmit = (e) => {
    e.preventDefault();
    setShowFields(true);
  };
  const handleAddMoreField = () => {
    const newVariant = {
      id: idCount,
      product: id,
      product_attributes: [],
      price: 100,
      stock: 10,
      status: true,
    };
    setProductVariants([...productVariants, newVariant]);
    setIdCount(idCount + 1);
  };
  const handleRemoveField = (variantId) => {
    const updatedVariants = productVariants.filter(
      (variant) => variant.id !== variantId
    );
    setProductVariants(updatedVariants);
  };
  const handleFieldChange = (variantId, fieldName, value) => {
    const updatedVariants = productVariants.map((variant) => {
      if (variant.id === variantId) {
        const updatedVariant = { ...variant };
        if (
          fieldName === "COLOR" ||
          fieldName === "STORAGE" ||
          fieldName === "RAM"
        ) {
          const existingAttributes = [...updatedVariant.product_attributes];
          const attributeIndex = existingAttributes.findIndex(
            (attr) => Object.keys(attr)[0] === fieldName
          );
          if (attributeIndex !== -1) {
            existingAttributes[attributeIndex] = { [fieldName]: value };
          } else {
            existingAttributes.push({ [fieldName]: value });
          }
          updatedVariant.product_attributes = existingAttributes;
        } else {
          updatedVariant[fieldName.toLowerCase()] = value;
        }
        return updatedVariant;
      }
      return variant;
    });
    setProductVariants(updatedVariants);
  };
  const getAttributeValue = (variantId, fieldName) => {
    const variant = productVariants.find((variant) => variant.id === variantId);

    if (variant) {
      if (
        fieldName === "COLOR" ||
        fieldName === "STORAGE" ||
        fieldName === "RAM"
      ) {
        const attribute = variant.product_attributes.find(
          (attr) => Object.keys(attr)[0] === fieldName
        );
        return attribute ? Object.values(attribute)[0] : "";
      } else {
        return variant[fieldName.toLowerCase()];
      }
    }
    return "";
  };
  const handleAddImageField = () => {
    const newImage = {
      id: imageCount,
      image: null,
      default_img: false,
    };
    setProductImages([...productImages, newImage]);
    setImageCount(imageCount + 1);
  };
  const handleRemoveImage = (imageId) => {
    if (productImages.length !== 1) {
      const removedImage = productImages.find(
        (imageItem) => imageItem.id === imageId
      );
      const updatedImages = productImages.filter(
        (imageItem) => imageItem.id !== imageId
      );
      if (removedImage.default_img && updatedImages.length > 0) {
        const updatedDefaultImage = updatedImages.find(
          (imageItem) => imageItem.id === 1
        );
        if (updatedDefaultImage) {
          updatedDefaultImage.default_img = true;
        }
      }
      setProductImages(updatedImages);
    } else {
      toast.warning("Atleast one image field is Required!");
    }
  };
  const handleImageChange = (imageId, fieldName, file) => {
    const updatedImages = productImages.map((imageItem) => {
      if (imageItem.id === imageId) {
        const updatedImage = { ...imageItem };
        updatedImage[fieldName] = file;
        return updatedImage;
      }
      return imageItem;
    });
    setProductImages(updatedImages);
  };
  const handleStatusChange = (Id, item, status) => {
    const updatedVariants = productVariants.map((varient) => {
      if (varient.id === Id) {
        const updatedVariant = { ...varient };
        updatedVariant[item] = status;
        return updatedVariant;
      }
      return varient;
    });
    setProductVariants(updatedVariants);
  };
  const handleDefaultChange = (Id) => {
    const updatedImages = productImages.map((imageItem) => {
      if (imageItem.id === Id) {
        return { ...imageItem, default_img: true };
      } else {
        return { ...imageItem, default_img: false };
      }
    });
    setProductImages(updatedImages);
  };
  const handleVariantSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    api
      .post(
        "admin/add-alternatives",
        { productVariants, productImages },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        toast.success("Successfull!");
        navigate(-1);
      })
      .catch((error) => {
        toast.error("An Error Occured!");
      });
    setLoading(false);
  };
  return (
    <Struct>
      <h1 className="text-3xl md:text-4xl">{product?.product_name}</h1>

      {!showFields && (
        <Modal>
          <form onSubmit={handleAttrSubmit} className="md:w-96">
            <h1 className="modal-heading">
              Choose Specifications <span className="text-xs">(Optional)</span>
            </h1>
            <div className="modal-divider"></div>
            <div className="m-2">
              <label className="flex items-center gap-2 w-max">
                <input
                  className="togglerInput"
                  type="checkbox"
                  value={"COLOR"}
                  onChange={handleAttrChange}
                />
                COLOR
              </label>
            </div>
            <div className="m-2">
              <label className="flex items-center gap-2 w-max">
                <input
                  className="togglerInput"
                  type="checkbox"
                  value={"SIZE"}
                  onChange={handleAttrChange}
                />
                SIZE
              </label>
            </div>
            <div className="m-2">
              <label className="flex items-center gap-2 w-max">
                <input
                  className="togglerInput"
                  type="checkbox"
                  value={"STORAGE"}
                  onChange={handleAttrChange}
                />
                STORAGE
              </label>
            </div>
            <div className="m-2">
              <label className="flex items-center gap-2 w-max">
                <input
                  className="togglerInput"
                  type="checkbox"
                  value={"RAM"}
                  onChange={handleAttrChange}
                />
                RAM
              </label>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="submit"
                onClick={() => navigate(-1)}
                className="px-3 py-1 bg-red-600 rounded"
              >
                Back
              </button>
              <button type="submit" className="px-3 py-1 bg-green-600 rounded">
                Done
              </button>
            </div>
          </form>
        </Modal>
      )}

      <form onSubmit={handleVariantSubmit} className="_pdtForm-container">
        <div className="flex justify-end gap-2">
          <Link to={-1} className="px-3 py-1 bg-red-600 mb-2">
            Cancel
          </Link>
          <button className="px-3 py-1 bg-green-600 mb-2" type="submit">
            Save
          </button>
        </div>

        <div className="varImage_Box_AE">
          <div className="varImage_list_AE">
            {productImages.map((image_item, index) => (
              <div key={index}>
                {image_item.image === null ? (
                  <div className="varImage_Item_AE">
                    <input
                      accept="image/*"
                      type="file"
                      required
                      name="image"
                      onChange={(e) =>
                        handleImageChange(
                          image_item.id,
                          e.target.name,
                          e.target.files[0]
                        )
                      }
                    />
                    {image_item.id !== 0 && (
                      <div className="absolute flex right-2 gap-2 top-1">
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(image_item.id)}
                          className="text-red-600 text-xl"
                        >
                          <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                      </div>
                    )}
                    <div className="text-center">
                      <span className="text-3xl block text-center">
                        <FontAwesomeIcon icon={faImage} />
                      </span>
                      <span className="text-xs p-1 md:text-sm">
                        Choose a file or Drag it here
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="varImage_Item_AE">
                    <div className="absolute flex justify-between items-center gap-2 top-1 w-full px-2">
                      <input
                        id="varImage_radio"
                        type="radio"
                        name="default_img"
                        onChange={() => handleDefaultChange(image_item.id)}
                        checked={image_item.default_img}
                      />
                      <button
                        onClick={() => handleRemoveImage(image_item.id)}
                        type="button"
                        className="text-red-600 text-xl"
                      >
                        <FontAwesomeIcon icon={faCircleXmark} />
                      </button>
                    </div>
                    <img
                      src={URL.createObjectURL(image_item.image)}
                      onClick={() => handleDefaultChange(image_item.id)}
                      alt={image_item.image.name}
                    />
                  </div>
                )}
              </div>
            ))}
            {/*  */}
            <div className="varImage_Item_AE" onClick={handleAddImageField}>
              <span className="bg-222 px-3 md:px-5 py-1 md:py-3 rounded-full text-2xl">
                +
              </span>
            </div>
          </div>
        </div>

        {showFields && (
          <>
            <div className="variantTable_Box">
              <table className="variantTable_">
                <thead>
                  <tr>
                    {productAttrs.includes("COLOR") && <th>COLOR</th>}
                    {productAttrs.includes("STORAGE") && <th>STORAGE</th>}
                    {productAttrs.includes("SIZE") && <th>SIZE</th>}
                    {productAttrs.includes("RAM") && <th>RAM</th>}
                    <th>PRICE</th>
                    <th>STOCK</th>
                    <th>STATUS</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {productVariants.map((item, index) => (
                    <tr key={index}>
                      {productAttrs.includes("COLOR") && (
                        <td>
                          <input
                            type="text"
                            name="COLOR"
                            onChange={(e) =>
                              handleFieldChange(
                                item.id,
                                e.target.name,
                                e.target.value.toUpperCase()
                              )
                            }
                            value={getAttributeValue(item.id, "COLOR")}
                            placeholder="eg; WHITE"
                            required
                          />
                        </td>
                      )}
                      {productAttrs.includes("STORAGE") && (
                        <td>
                          <input
                            type="text"
                            name="STORAGE"
                            onChange={(e) =>
                              handleFieldChange(
                                item.id,
                                e.target.name,
                                e.target.value.toUpperCase()
                              )
                            }
                            value={getAttributeValue(item.id, "STORAGE")}
                            placeholder="eg; 128 GB"
                            required
                          />
                        </td>
                      )}
                      {productAttrs.includes("SIZE") && (
                        <td>
                          <input
                            type="text"
                            name="SIZE"
                            onChange={(e) =>
                              handleFieldChange(
                                item.id,
                                e.target.name,
                                e.target.value.toUpperCase()
                              )
                            }
                            value={getAttributeValue(item.id, "SIZE")}
                            placeholder="eg; 24 inch"
                            required
                          />
                        </td>
                      )}
                      {productAttrs.includes("RAM") && (
                        <td>
                          <input
                            type="text"
                            name="RAM"
                            onChange={(e) =>
                              handleFieldChange(
                                item.id,
                                e.target.name,
                                e.target.value.toUpperCase()
                              )
                            }
                            value={getAttributeValue(item.id, "RAM")}
                            placeholder="eg; 6 GB"
                            required
                          />
                        </td>
                      )}
                      <td className="flex justify-center">
                        <div className="relative flex items-center">
                          <input
                            type="number"
                            name="PRICE"
                            onChange={(e) =>
                              handleFieldChange(
                                item.id,
                                e.target.name,
                                e.target.value
                              )
                            }
                            value={getAttributeValue(item.id, "PRICE")}
                            placeholder="10,000"
                            required
                            style={{ textAlign: "left", paddingLeft: "40px" }}
                          />
                          <div className="absolute bg-121 h-full px-2 flex items-center border rounded-l border-121">
                            <FontAwesomeIcon icon={faInr} className="text-xl" />
                          </div>
                        </div>
                      </td>
                      <td>
                        <input
                          type="number"
                          name="STOCK"
                          onChange={(e) =>
                            handleFieldChange(
                              item.id,
                              e.target.name,
                              e.target.value
                            )
                          }
                          value={getAttributeValue(item.id, "STOCK")}
                          placeholder="eg; 50"
                          required
                        />
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          className="togglerInput"
                          name="status"
                          onChange={(e) =>
                            handleStatusChange(
                              item.id,
                              e.target.name,
                              !item.status
                            )
                          }
                          checked={item.status}
                        />
                      </td>
                      <td>
                        {index !== 0 && (
                          <button
                            type="button"
                            className="text-red-600"
                            onClick={() => handleRemoveField(item.id)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end my-3">
              <button
                type="button"
                onClick={handleAddMoreField}
                className="bg-cyan-700 py-1 px-3 rounded-lg"
              >
                Add more +
              </button>
            </div>
          </>
        )}
      </form>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnHover={false}
        theme="dark"
      />
    </Struct>
  );
}

export default AddVariant;
