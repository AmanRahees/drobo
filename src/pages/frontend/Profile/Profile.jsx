import React, { useEffect, useState } from "react";
import useAxios from "../../../services/useAxios";
import Struct from "../../../components/frontend/Struct/Struct";
import Account from "../../../components/frontend/Account/Account";
import Loader from "../../../components/Loader/Loader";
import "./profile.css";

function Profile() {
  const api = useAxios();
  const [editAction, setEditAction] = useState(true);
  const [formData, setFormData] = useState({
    id: 0,
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    gender: "",
    phone: 0,
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api
      .get("profile")
      .then((response) => {
        setFormData(response.data);
        setLoading(false);
      })
      .catch((error) => {});
    // eslint-disable-next-line
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleFormSubmit = () => {
    api
      .put(`profile`, formData)
      .then((response) => {
        setEditAction(true);
      })
      .catch((error) => {});
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <Struct>
      <Account>
        <div className="flex gap-3 text-primary-color">
          <p className="text-lg font-bold">Personal Information</p>
          {editAction ? (
            <button
              type="button"
              onClick={() => setEditAction(false)}
              className="text-cyan-600 font-normal"
            >
              Edit
            </button>
          ) : (
            <button
              onClick={handleFormSubmit}
              className="text-cyan-600 font-normal"
            >
              Save
            </button>
          )}
        </div>
        <div className="md:flex gap-5 my-5">
          <div className="relative">
            <label className="block text-gray-700 mb-1">First Name</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name !== null ? formData.first_name : ""}
              onChange={handleInputChange}
              disabled={editAction}
              className="w-full md:w-80 p-2 border border-gray-300 rounded-lg outline-none focus:border-teal-600"
            />
          </div>
          <div className="relative">
            <label className="block text-gray-700 mb-1">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name !== null ? formData.last_name : ""}
              onChange={handleInputChange}
              disabled={editAction}
              className="w-full md:w-80 p-2 border border-gray-300 rounded-lg outline-none focus:border-teal-600"
            />
          </div>
        </div>
        <p className="text-lg font-bold">Your Gender</p>
        <div className="flex gap-5 my-5">
          <div className="relative flex items-center gap-3">
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === "Male" ? true : false}
              onChange={handleInputChange}
              disabled={editAction}
              id="male"
              className="p-2 border border-gray-300 rounded-lg outline-none focus:border-teal-600"
            />
            <label className="block text-gray-700 mb-1" htmlFor="male">
              Male
            </label>
          </div>
          <div className="relative  flex items-center gap-3">
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === "Female" ? true : false}
              onChange={handleInputChange}
              disabled={editAction}
              id="female"
              className="p-2 border border-gray-300 rounded-lg outline-none focus:border-teal-600"
            />
            <label className="block text-gray-700 mb-1" htmlFor="female">
              Female
            </label>
          </div>
        </div>
        <div className="my-2">
          <p className="text-lg font-bold mb-3">Email Address</p>
          <input
            type="text"
            value={formData.email}
            disabled={true}
            className="w-full md:w-80 p-2 border border-gray-300 rounded-lg outline-none focus:border-teal-600"
          />
        </div>
        <div className="my-2">
          <p className="text-lg font-bold mb-3">Phone Number</p>
          <input
            type="number"
            name="phone"
            value={formData.phone !== null ? formData.phone : ``}
            onChange={handleInputChange}
            disabled={editAction}
            className="w-full md:w-80 p-2 border border-gray-300 rounded-lg outline-none focus:border-teal-600"
          />
        </div>
        <div className="my-4">
          <p className="text-lg font-bold mb-3">FAQs</p>
          <b className="text-md font-bold">
            What happens when I update my email address (or mobile number)?
          </b>
          <p className="">
            Your login email id (or mobile number) changes, likewise. You'll
            receive all your account related communication on your updated email
            address (or mobile number).
          </p>
        </div>
      </Account>
    </Struct>
  );
}

export default Profile;
