import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAxios from "../../../services/useAxios";
import Struct from "../../../components/frontend/Struct/Struct";

const Required = () => {
  return <span className="text-red-600">*</span>;
};

function AddAddress() {
  const api = useAxios();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: "",
    phone: 0,
    house_name: "",
    road_name: "",
    city: "",
    district: "",
    state: "",
    pincode: "",
    type: "Home",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log({ name, value });
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    api
      .post("profile/address", formData)
      .then((resonse) => {
        console.log(resonse);
        navigate(-1);
      })
      .catch((error) => {});
  };
  return (
    <Struct>
      <div className="md:grid md:place-items-center">
        <div className="bg-white text-primary-color p-10 shadow border border-gray-300">
          <h1 className="text-center text-xl md:text-3xl mb-3">Add Address</h1>
          <hr />
          <form
            onSubmit={handleFormSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-3"
          >
            <div className="relative">
              <label className="block mb-1">
                Full Name <Required />
              </label>
              <input
                type="text"
                name="full_name"
                onChange={handleInputChange}
                value={formData.full_name}
                maxLength={20}
                className="w-full md:w-80 border border-gray-300 p-1 md:p-2 outline-none text-gray-700 rounded-md"
                required
              />
            </div>
            <div className="relative">
              <label className="block mb-1">
                Phone Number <Required />
              </label>
              <input
                type="number"
                name="phone"
                onChange={handleInputChange}
                value={formData.phone !== 0 && formData.phone}
                maxLength={10}
                className="w-full md:w-80 border border-gray-300 p-1 md:p-2 outline-none text-gray-700 rounded-md"
                required
              />
            </div>
            <div className="col-span-1 md:col-span-2 flex items-center gap-3">
              <label
                htmlFor="homeType"
                className="relative border flex gap-2 border-gray-300 px-3 py-1 rounded-xl"
              >
                <input
                  type="radio"
                  defaultChecked={true}
                  name="type"
                  onChange={handleInputChange}
                  value={"Home"}
                  id="homeType"
                />
                <span className="">Home</span>
              </label>
              <label
                htmlFor="workType"
                className="relative border flex gap-2 border-gray-300 px-3 py-1 rounded-xl"
              >
                <input
                  type="radio"
                  name="type"
                  onChange={handleInputChange}
                  value={"Work"}
                  id="workType"
                />
                <span className="">Work</span>
              </label>
            </div>
            <div className="relative">
              <label className="block mb-1">
                Building Name <Required />
              </label>
              <input
                type="text"
                name="house_name"
                onChange={handleInputChange}
                value={formData.house_name}
                className="w-full md:w-80 border border-gray-300 p-1 md:p-2 outline-none text-gray-700 rounded-md"
                required
              />
            </div>
            <div className="relative">
              <label className="block mb-1">
                Road Name <Required />
              </label>
              <input
                type="text"
                name="road_name"
                onChange={handleInputChange}
                value={formData.road_name}
                className="w-full md:w-80 border border-gray-300 p-1 md:p-2 outline-none text-gray-700 rounded-md"
                required
              />
            </div>
            <div className="relative">
              <label className="block mb-1">
                City <Required />
              </label>
              <input
                type="text"
                name="city"
                onChange={handleInputChange}
                value={formData.city}
                className="w-full md:w-80 border border-gray-300 p-1 md:p-2 outline-none text-gray-700 rounded-md"
                required
              />
            </div>
            <div className="relative">
              <label className="block mb-1">
                District <Required />
              </label>
              <input
                type="text"
                name="district"
                onChange={handleInputChange}
                value={formData.district}
                className="w-full md:w-80 border border-gray-300 p-1 md:p-2 outline-none text-gray-700 rounded-md"
                required
              />
            </div>
            <div className="relative">
              <label className="block mb-1">
                State <Required />
              </label>
              <input
                type="text"
                name="state"
                onChange={handleInputChange}
                value={formData.state}
                className="w-full md:w-80 border border-gray-300 p-1 md:p-2 outline-none text-gray-700 rounded-md"
                required
              />
            </div>
            <div className="relative">
              <label className="block mb-1">
                Pincode <Required />
              </label>
              <input
                type="text"
                name="pincode"
                onChange={handleInputChange}
                value={formData.pincode}
                className="w-full md:w-80 border border-gray-300 p-1 md:p-2 outline-none text-gray-700 rounded-md"
                required
              />
            </div>
            <div className="flex justify-end gap-2 col-span-1 md:col-span-2">
              <Link
                to={-1}
                type="submit"
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="bg-primary-color text-white px-3 py-1 rounded"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </Struct>
  );
}

export default AddAddress;
