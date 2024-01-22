import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faBox } from "@fortawesome/free-solid-svg-icons";
import useAxios from "../../../services/useAxios";
import Modal from "../../../components/backend/Modal/Modal";
import Loader from "../../../components/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function BrandOffer() {
  const api = useAxios();
  const [brandData, setBrandData] = useState([]);
  const [offerBrands, setOfferBrands] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [addFormData, setAddFormData] = useState({
    brand_id: 0,
    brand_offer: 1,
  });
  useEffect(() => {
    api
      .get("admin/brand")
      .then((response) => {
        let data = response.data;
        let brandsOnOffer = data.filter((brand) => brand.brand_offer > 0);
        setBrandData(data);
        setLoading(false);
        setOfferBrands(brandsOnOffer);
      })
      .catch((error) => {});
    // eslint-disable-next-line
  }, []);
  const handleAddFormChange = (e) => {
    const { name, value } = e.target;
    const numericValue = Number(value);
    if (name === "brand_offer" && numericValue >= 1 && numericValue <= 30) {
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
    if (addFormData.brand_id > 0 && addFormData.brand_offer >= 1) {
      api
        .put(`admin/brand/${addFormData.brand_id}`, addFormData)
        .then((response) => {
          let data = response.data;
          let checkData = offerBrands.some((brand) => brand.id === data.id);
          if (checkData) {
            setOfferBrands((prevOfferBrands) =>
              prevOfferBrands.map((item) =>
                item.id === addFormData.brand_id ? data : item
              )
            );
          } else {
            setOfferBrands((prevOfferBrands) => [...prevOfferBrands, data]);
          }
          setShowAddModal(false);
          toast.success("Offer Added!");
          setAddFormData({ brand_id: 0, brand_offer: 1 });
        })
        .catch((error) => {});
    } else {
      toast.error("Invalid Entry!");
    }
  };
  const handleRemoveOffer = (Id) => {
    api
      .put(`admin/brand/${Id}`, { brand_offer: 0 })
      .then((resonse) => {
        setBrandData((prevBrands) =>
          prevBrands.filter((brand) => brand.id !== Id)
        );
        setOfferBrands((prevBrands) =>
          prevBrands.filter((brand) => brand.id !== Id)
        );
      })
      .catch((error) => {});
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <>
      {offerBrands.length > 0 ? (
        <>
          <table className="backendTable">
            <thead className="text-center">
              <tr>
                <th>#</th>
                <th>Brand</th>
                <th>Offer %</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {offerBrands.map((brand, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{brand.brand_name}</td>
                  <td>
                    {brand.brand_offer > 0 ? (
                      <span className="text-green-600">
                        {brand.brand_offer}%
                      </span>
                    ) : (
                      <span>-</span>
                    )}
                  </td>
                  <td>
                    <button
                      disabled={brand.brand_offer < 1}
                      onClick={() => handleRemoveOffer(brand.id)}
                      className={`${
                        brand.brand_offer > 0 ? "text-red-600" : "text-gray-400"
                      }`}
                    >
                      <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end my-2">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-3 py-1 bg-sub-color rounded-md"
            >
              + Add Offer
            </button>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-full">
          <div className="flex flex-col items-center">
            <FontAwesomeIcon icon={faBox} className="text-9xl" />
            <p className="text-center my-3 text-2xl">No Brands on Offers!</p>
            <button
              onClick={() => setShowAddModal(true)}
              to="/admin/brands"
              className="p-2 text-sm bg-sub-color text-center rounded-lg"
            >
              + Add Brand Offers
            </button>
          </div>
        </div>
      )}
      {showAddModal && (
        <Modal>
          <p className="modal-heading">Add Brand Offer</p>
          <div className="modal-divider"></div>
          <div className="md:w-[400px]">
            <div className="relative flex items-center gap-3">
              <label className="block">Brand:</label>
              <select
                name="brand_id"
                onChange={handleAddFormChange}
                value={addFormData.brand_id}
                className="bg-transparent text-white p-2 outline-none border border-slate-800 rounded w-full my-2"
              >
                <option className="bg-121">--SELECT BRAND--</option>
                {brandData.map((brand, index) => (
                  <option value={brand.id} key={index} className="bg-121">
                    {brand.brand_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative flex items-center gap-5">
              <label className="block">Offer:</label>
              <input
                type="number"
                name="brand_offer"
                value={addFormData.brand_offer > 0 && addFormData.brand_offer}
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

export default BrandOffer;
