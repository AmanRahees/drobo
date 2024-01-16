import React from "react";
import Struct from "../../../components/frontend/Struct/Struct";
import Account from "../../../components/frontend/Account/Account";
import "./profile.css";

function Profile() {
  return (
    <Struct>
      <Account>
        <p className="text-lg font-bold">Personal Information</p>
        <div className="md:flex gap-5 my-5">
          <div className="relative">
            <label className="block text-gray-700 mb-1">First Name</label>
            <input
              type="text"
              className="w-full md:w-80 p-2 border border-gray-300 rounded-lg outline-none focus:border-teal-600"
            />
          </div>
          <div className="relative">
            <label className="block text-gray-700 mb-1">Last Name</label>
            <input
              type="text"
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
            className="w-full md:w-80 p-2 border border-gray-300 rounded-lg outline-none focus:border-teal-600"
          />
        </div>
        <div className="my-2">
          <p className="text-lg font-bold mb-3">Phone Number</p>
          <input
            type="text"
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
