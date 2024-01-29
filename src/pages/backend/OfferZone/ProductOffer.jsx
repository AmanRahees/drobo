import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faTableCells } from "@fortawesome/free-solid-svg-icons";
import useAxios from "../../../services/useAxios";
import Modal from "../../../components/backend/Modal/Modal";
import Loader from "../../../components/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProductOffer() {
  const api = useAxios();
  const [productData, setProductData] = useState([]);
  const [offerProducts, setOfferProducts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [addFormData, setAddFormData] = useState({
    product_id: 0,
    product_offer: 1,
  });
  useEffect(() => {
    api
      .get("admin/get-products")
      .then((response) => {
        let data = response.data;
        let productsOnOffer = data.filter(
          (product) => product.product_offer > 0
        );
        setProductData(data);
        setLoading(false);
        setOfferProducts(productsOnOffer);
      })
      .catch((error) => {});
    // eslint-disable-next-line
  }, []);
  const handleAddFormChange = (e) => {
    const { name, value } = e.target;
    const numericValue = Number(value);
    if (name === "product_offer" && numericValue >= 1 && numericValue <= 30) {
      setAddFormData((prevFormData) => ({
        ...prevFormData,
        [name]: numericValue,
      }));
    } else {
      setAddFormData((prevFormData) => ({
        ...prevFormData,
        [name]: numericValue,
      }));
    }
  };
  const handleAddOffer = () => {
    if (addFormData.product_id > 0 && addFormData.product_offer >= 1) {
      api
        .put(`admin/products/${addFormData.product_id}`, addFormData)
        .then((response) => {
          let data = response.data;
          let checkData = offerProducts.some(
            (product) => product.id === data.id
          );
          if (checkData) {
            setOfferProducts((prevOfferProducts) =>
              prevOfferProducts.map((item) =>
                item.id === addFormData.product_id ? data : item
              )
            );
          } else {
            setOfferProducts((prevOfferProducts) => [
              ...prevOfferProducts,
              data,
            ]);
          }
          setShowAddModal(false);
          toast.success("Offer Added!");
          setAddFormData({ brand_id: 0, brand_offer: 1 });
        })
        .catch((error) => {});
    } else {
      console.log(addFormData);
      toast.error("Invalid Entry!");
    }
  };
  const handleRemoveOffer = (Id) => {
    api
      .put(`admin/products/${Id}`, { product_offer: 0 })
      .then((resonse) => {
        setProductData((prevProducts) =>
          prevProducts.filter((product) => product.id !== Id)
        );
        setOfferProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== Id)
        );
      })
      .catch((error) => {});
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <>
      {offerProducts.length > 0 ? (
        <>
          <table className="backendTable">
            <thead className="text-center">
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Offer %</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {offerProducts.map((product, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{product.product_name}</td>
                  <td>
                    {product.product_offer > 0 ? (
                      <span className="text-green-600">
                        {product.product_offer}%
                      </span>
                    ) : (
                      <span>-</span>
                    )}
                  </td>
                  <td>
                    <button
                      disabled={product.product_offer < 1}
                      onClick={() => handleRemoveOffer(product.id)}
                      className={`${
                        product.product_offer > 0
                          ? "text-red-600"
                          : "text-gray-400"
                      }`}
                    >
                      <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end mt-5">
            <button
              onClick={() => setShowAddModal(true)}
              to="/admin/brands"
              className="p-2 text-sm bg-sub-color text-center rounded-lg"
            >
              + Add Offers
            </button>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-full">
          <div className="flex flex-col items-center">
            <FontAwesomeIcon icon={faTableCells} className="text-9xl" />
            <p className="text-center my-3 text-2xl">No Products on Offers!</p>
            <button
              onClick={() => setShowAddModal(true)}
              to="/admin/brands"
              className="p-2 text-sm bg-sub-color text-center rounded-lg"
            >
              + Add Product Offers
            </button>
          </div>
        </div>
      )}
      {showAddModal && (
        <Modal>
          <p className="modal-heading">Add Product Offer</p>
          <div className="modal-divider"></div>
          <div className="md:w-[400px]">
            <div className="relative flex items-center gap-3">
              <label className="block">Product:</label>
              <select
                name="product_id"
                onChange={handleAddFormChange}
                value={addFormData.product_id}
                className="bg-transparent text-white p-2 outline-none border border-slate-800 rounded w-full my-2"
              >
                <option className="bg-121">--SELECT PRODUCT--</option>
                {productData.map((product, index) => (
                  <option value={product.id} key={index} className="bg-121">
                    {product.product_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative flex items-center gap-5">
              <label className="block">Offer:</label>
              <input
                type="number"
                name="product_offer"
                value={
                  addFormData.product_offer > 0 && addFormData.product_offer
                }
                onChange={handleAddFormChange}
                className="bg-transparent text-white p-2 outline-none border border-slate-800 rounded w-1/4 my-2"
              />
            </div>
          </div>
          <div className="modal-divider"></div>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setShowAddModal(false)}
              className="px-3 py-1 bg-red-600 text-sm rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleAddOffer}
              className="px-3 py-1 bg-green-600 text-sm rounded"
            >
              Save
            </button>
          </div>
        </Modal>
      )}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnHover={false}
        theme="dark"
      />
    </>
  );
}

export default ProductOffer;
