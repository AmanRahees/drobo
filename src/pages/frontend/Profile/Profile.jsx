import React from "react";
import { Link } from "react-router-dom";
import Struct from "../../../components/frontend/Struct/Struct";
import "./profile.css";

function Profile() {
  return (
    <Struct>
      <div className="pfl-container">
        <div className="pftBox shadow">
          <div className="relative">
            <div className="w-full h-28 md:h-52 bg-primary-color relative">
              <div className="absolute flex gap-3 left-2/3 -translate-x-10 top-1/2 -translate-y-1/2 md:translate-y-0 md:top-1/3">
                <Link className="md:w-28 p-1 px-2 md:h-28 bg-white flex flex-col justify-center items-center rounded">
                  <h1 className="text-xs md:text-base md:mb-3">Orders</h1>
                  <h1 className="text-xs md:text-3xl">0</h1>
                </Link>
                <Link className="md:w-28 p-1 md:h-28 bg-white flex flex-col justify-center items-center rounded">
                  <h1 className="text-xs md:text-base md:mb-3">Coupons</h1>
                  <h1 className="text-xs md:text-3xl">0</h1>
                </Link>
              </div>
            </div>
            <div className="absolute top-1/2 -translate-y-1/3 left-5 md:left-20">
              <img
                className="rounded-full w-1/2 md:w-full"
                src="data:image/png;base64,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"
                alt=""
              />
            </div>
          </div>
          <div className="pftBody">
            <div className="md:text-3xl my-1 md:my-3">Personal Information</div>
            <hr />
            <div className="md:flex gap-24 my-3 md:my-5">
              <div className="md:w-1/3 hidden md:block">
                <p className="">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Veritatis ipsa cumque exercitationem consectetur placeat
                  quibusdam eos doloribus quidem fuga amet voluptatibus
                  voluptate repudiandae assumenda, est harum consequuntur eaque,
                  alias doloremque!
                </p>
              </div>
              <div className="md:w-2/3">
                <div className="md:flex gap-5 md:my-5">
                  <div className="relative md:w-1/2">
                    <label className="block mb-1">First Name</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 p-1 md:p-2 outline-none text-gray-700 rounded-md"
                    />
                  </div>
                  <div className="relative md:w-1/2">
                    <label className="block mb-1">Last Name</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 p-1 md:p-2 outline-none text-gray-700 rounded-md"
                    />
                  </div>
                </div>
                <div className="md:flex gap-5 md:my-5">
                  <div className="relative md:w-1/2">
                    <label className="block mb-1">Phone</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 p-1 md:p-2 outline-none text-gray-700 rounded-md"
                    />
                  </div>
                  <div className="relative md:w-1/2">
                    <label className="block mb-1">Email</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 p-1 md:p-2 outline-none text-gray-700 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Struct>
  );
}

export default Profile;
