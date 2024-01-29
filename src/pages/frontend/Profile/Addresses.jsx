import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import useAxios from "../../../services/useAxios";
import Struct from "../../../components/frontend/Struct/Struct";
import Account from "../../../components/frontend/Account/Account";
import Loader from "../../../components/Loader/Loader";
import "./profile.css";

function Addresses() {
  const api = useAxios();
  const [loading, setLoading] = useState(true);
  const [addresses, setAddresses] = useState([]);
  useEffect(() => {
    api
      .get("profile/address")
      .then((response) => {
        setAddresses(response.data);
        setLoading(false);
      })
      .catch((error) => {});
    // eslint-disable-next-line
  }, []);
  if (loading) {
    return <Loader />;
  } else {
    return (
      <Struct>
        <Account>
          {addresses.length > 0 ? (
            <>
              <p className="text-xl font-bold">Manage Addresses</p>
              <div className="my-3">
                <div className="flex justify-end">
                  <Link
                    to="/profile/add-address"
                    className="border text-sm bg-slate-100 text-primary-color py-2 px-5 rounded-lg"
                  >
                    + ADD A NEW ADDRESS
                  </Link>
                </div>
                {addresses.map((address, index) => (
                  <div key={index} className="my-3">
                    <div className="border bg-slate-50 border-gray-200 p-5 rounded-lg shadow">
                      <div className="float-right">
                        <Link
                          to={`/profile/edit-address/${address.id}`}
                          className="text-blue-500 mr-5"
                        >
                          <FontAwesomeIcon icon={faPen} />
                        </Link>
                        <button className="text-red-600">
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                      <button
                        type="button"
                        className={`p-1 ${
                          address.type === "Home"
                            ? "bg-cyan-500"
                            : "bg-orange-500"
                        } text-white text-xs`}
                      >
                        {address.type}
                      </button>
                      <p className="font-bold my-2">{address.full_name}</p>
                      <p className="font-bold my-2">{address.phone}</p>
                      <p className="my-2">
                        {address.house_name}, {address.road_name},{" "}
                        {address.city}, {address.district}, {address.state}
                      </p>
                      <p className="font-bold my-2">{address.pincode}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center h-full">
              <div className="flex flex-col items-center">
                <FontAwesomeIcon
                  icon={faAddressBook}
                  className="text-gray-600 text-[100px] md:text-[140px] mb-2"
                />
                <p className="text-center text-lg font-bold text-primary-color">
                  Your Address Book is empty!
                </p>
                <Link
                  to="/profile/add-address"
                  className="bg-primary-color text-xs text-white mt-2 py-2 px-4 rounded-md"
                >
                  + ADD A ADDRESS
                </Link>
              </div>
            </div>
          )}
        </Account>
      </Struct>
    );
  }
}

export default Addresses;
