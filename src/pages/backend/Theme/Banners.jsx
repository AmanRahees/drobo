import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPanorama, faTrash } from "@fortawesome/free-solid-svg-icons";
import useAxios from "../../../services/useAxios";
import { apiUrl } from "../../../services/constants";
import Struct from "../../../components/backend/Struct/Struct";
import Loader from "../../../components/Loader/Loader";
import "./banners.css";

function Theme() {
  const api = useAxios();
  const [bannersData, setBannersData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api
      .get("admin/banners")
      .then((response) => {
        setBannersData(response.data);
        setLoading(false);
      })
      .catch((error) => {});
    // eslint-disable-next-line
  }, []);
  if (loading) {
    return <Loader />;
  }
  return (
    <Struct>
      <div className="float-right flex flex-col-reverse md:flex-row gap-2 mb-2">
        <Link
          className="bg-sub-color py-1 px-3 rounded-md"
          to="/admin/banners/add"
        >
          Add +
        </Link>
      </div>
      <h1 className="text-3xl md:text-4xl">Banners</h1>

      {bannersData.length > 0 ? (
        <div className="bannerBox_">
          {bannersData.map((banner, index) => (
            <div
              key={index}
              className="bannerItem_ border rounded-md border-gray-700 mb-3"
            >
              <div className="absolute top-2 right-2">
                <button className="bg-red-600 text-white px-2 py-1 rounded-md">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
              <img src={apiUrl + banner.banner} alt={banner.banner.image} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-full">
          <div className="flex flex-col">
            <FontAwesomeIcon icon={faPanorama} className="text-9xl" />
            <p className="text-center my-3 text-2xl">No Banners Found!</p>
          </div>
        </div>
      )}
    </Struct>
  );
}

export default Theme;
