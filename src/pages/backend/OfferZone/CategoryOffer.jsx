import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faBoxes } from "@fortawesome/free-solid-svg-icons";
import useAxios from "../../../services/useAxios";
import Modal from "../../../components/backend/Modal/Modal";
import Loader from "../../../components/Loader/Loader";

function CategoryOffer() {
  const api = useAxios();
  const [categoryData, setCategoryData] = useState([]);
  const [selectedData, setSelectedData] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api
      .get("admin/category")
      .then((response) => {
        const data = response.data;
        let sortedData = data.sort(
          (a, b) => b.category_offer - a.category_offer
        );
        setCategoryData(sortedData);
        setLoading(false);
      })
      .catch((error) => {});
    // eslint-disable-next-line
  }, []);
  const handleSelect = (id) => {
    const selectedValues = categoryData.find((category) => category.id === id);
    setSelectedData(selectedValues);
    setShowModal(true);
  };
  const valueIncrement = () => {
    if (selectedData.category_offer <= 30) {
      setSelectedData({
        ...selectedData,
        category_offer: selectedData.category_offer + 1,
      });
    }
  };
  const valueDecrement = () => {
    if (selectedData.category_offer >= 1) {
      setSelectedData({
        ...selectedData,
        category_offer: selectedData.category_offer - 1,
      });
    }
  };
  const handleValueSave = () => {
    api
      .put(`admin/category/${selectedData.id}`, selectedData)
      .then((response) => {
        if (response.status === 200) {
          const updateTheData = categoryData.map((item) =>
            item.id === selectedData.id ? { ...item, ...response.data } : item
          );
          setCategoryData(updateTheData);
          setShowModal(false);
        }
      })
      .catch((error) => {});
  };
  const handleRemoveOffer = (id) => {
    const selectedValues = categoryData.find((category) => category.id === id);
    let data = { ...selectedValues, category_offer: 0 };
    api
      .put(`admin/category/${id}`, data)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          const updateTheData = categoryData.map((item) =>
            item.id === id ? { ...item, ...response.data } : item
          );
          console.log(updateTheData);
          setCategoryData(updateTheData);
        }
      })
      .catch((error) => {});
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <>
      {categoryData.length > 0 ? (
        <table className="backendTable">
          <thead className="text-center">
            <tr>
              <th>#</th>
              <th>Category</th>
              <th>Offer %</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {categoryData.map((category, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td
                  className="text-sub-color cursor-pointer"
                  onClick={() => handleSelect(category.id)}
                >
                  {category.category_name}
                </td>
                <td>
                  {category.category_offer > 0 ? (
                    <span className="text-green-600">
                      {category.category_offer}%
                    </span>
                  ) : (
                    <span>-</span>
                  )}
                </td>
                <td>
                  <button
                    disabled={category.category_offer < 1}
                    onClick={() => handleRemoveOffer(category.id)}
                    className={`${
                      category.category_offer > 0
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
      ) : (
        <div className="flex justify-center items-center h-full">
          <div className="flex flex-col items-center">
            <FontAwesomeIcon icon={faBoxes} className="text-9xl" />
            <p className="text-center my-3 text-2xl">No Category Found!</p>
            <Link
              to="/admin/category"
              className="p-2 text-sm bg-sub-color text-center rounded-lg"
            >
              Go to Categories &rarr;
            </Link>
          </div>
        </div>
      )}
      {showModal && (
        <Modal>
          <p className="text-[20px] font-bold text-left">
            {selectedData?.category_name}
          </p>
          <div className="modal-divider"></div>
          <div className="p-1 text-left w-[300px]">
            <div className="flex items-center gap-2">
              <label htmlFor="mb-3">Offer:</label>
              <div className="flex border border-121 w-max overflow-hidden">
                <button onClick={valueDecrement} className="px-3 bg-slate-800">
                  -
                </button>
                <input
                  type="text"
                  className="w-[30px] p-1 text-center bg-transparent outline-none"
                  value={selectedData.category_offer}
                  readOnly
                />
                <button onClick={valueIncrement} className="px-3 bg-slate-800">
                  +
                </button>
              </div>
            </div>
            <div className="modal-divider"></div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-3 py-1 bg-red-600 text-sm rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleValueSave}
                className="px-3 py-1 bg-green-600 text-sm rounded"
              >
                Save
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default CategoryOffer;
