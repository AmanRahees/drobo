import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faTicket } from "@fortawesome/free-solid-svg-icons";
import useAxios from "../../../services/useAxios";
import Modal from "../../../components/backend/Modal/Modal";
import Loader from "../../../components/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Coupons() {
  const api = useAxios();
  const currentDate = new Date().toISOString().split("T")[0];
  const [couponData, setCouponData] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [addFormData, setAddFormData] = useState({
    coupon_code: "",
    coupon_value: Number(),
    expiration: "",
  });
  useEffect(() => {
    api
      .get("admin/coupons")
      .then((response) => {
        setCouponData(response.data);
        setLoading(false);
      })
      .catch((errror) => {});
    // eslint-disable-next-line
  }, []);
  const formatCouponDate = (coupon_date) => {
    let date = new Date(coupon_date);
    let options = { day: "numeric", month: "short", year: "numeric" };
    let formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  };
  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setAddFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (addFormData.coupon_value > 0) {
      api
        .post("admin/coupons", addFormData)
        .then((response) => {
          setCouponData([...couponData, response.data]);
          toast.success("Coupon Added!");
          setShowAddModal(false);
          setAddFormData({
            coupon_code: "",
            coupon_value: Number(),
            expiration: "",
          });
        })
        .catch((error) => {});
    } else {
      toast.error("Invalid Offer Value!");
    }
  };
  const handleCouponDelete = (id) => {
    api.delete(`admin/coupons/${id}`).then((response) => {
      let updatedCouponData = couponData.filter((coupon) => coupon.id !== id);
      console.log(updatedCouponData);
      setCouponData(updatedCouponData);
    });
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <>
      {couponData.length > 0 ? (
        <>
          <table className="backendTable">
            <thead className="text-center">
              <tr>
                <th>#</th>
                <th>Coupon Code</th>
                <th>Offer %</th>
                <th>Expiry</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {couponData.map((coupon, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{coupon.coupon_code}</td>
                  <td className="text-green-600">{coupon.coupon_value}%</td>
                  <td>{formatCouponDate(coupon.expiration)}</td>
                  <td>
                    <button
                      onClick={() => handleCouponDelete(coupon.id)}
                      className="text-red-600"
                    >
                      <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-2 flex justify-end">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-3 py-1 bg-sub-color rounded-md"
            >
              + Add Coupon
            </button>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-full">
          <div className="flex flex-col items-center">
            <FontAwesomeIcon icon={faTicket} className="text-9xl" />
            <p className="text-center my-3 text-2xl">No Coupons Found!</p>
            <button
              onClick={() => setShowAddModal(true)}
              to="/admin/brands"
              className="p-2 text-sm bg-sub-color text-center rounded-lg"
            >
              + Add Coupons
            </button>
          </div>
        </div>
      )}
      {showAddModal && (
        <Modal>
          <form onSubmit={handleAddSubmit}>
            <p className="modal-heading">Add Brand Offer</p>
            <div className="modal-divider"></div>
            <div className="md:w-[400px]">
              <div className="relative flex items-center gap-3">
                <label className="block">Product:</label>
                <input
                  type="text"
                  name="coupon_code"
                  onChange={handleAddInputChange}
                  value={addFormData.coupon_code}
                  className="bg-transparent text-white p-2 outline-none border border-gray-600 rounded my-2"
                />
              </div>
              <div className="relative flex items-center gap-5">
                <label className="block">Offer:</label>
                <input
                  type="number"
                  name="coupon_value"
                  value={
                    addFormData.coupon_value > 0 && addFormData.coupon_value
                  }
                  onChange={handleAddInputChange}
                  className="bg-transparent text-white p-2 outline-none border border-gray-600 rounded w-1/4 my-2"
                />
              </div>
              <div className="relative flex items-center gap-5">
                <label className="block">Expiry Date:</label>
                <input
                  type="date"
                  name="expiration"
                  min={currentDate}
                  value={addFormData.expiration}
                  onChange={handleAddInputChange}
                  className="bg-transparent text-white p-2 outline-none border border-gray-600 rounded my-2"
                />
              </div>
            </div>
            <div className="modal-divider"></div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-3 py-1 bg-red-600 text-sm rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleAddSubmit}
                className="px-3 py-1 bg-green-600 text-sm rounded"
              >
                Save
              </button>
            </div>
          </form>
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

export default Coupons;
