import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../services/axios";
import { apiUrl } from "../../../services/constants";
import Struct from "../../../components/frontend/Struct/Struct";
import Loader from "../../../components/Loader/Loader";

function AllCategories() {
  const navigate = useNavigate();
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get("contexts/get-descriptors")
      .then((response) => {
        setCategoryData(response.data.category);
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);
    // eslint-disable-next-line
  }, [setLoading]);
  if (loading) {
    return <Loader />;
  }
  return (
    <Struct>
      <div className="_hm_CtgBox">
        <div className="_hm_CtgGrid">
          {categoryData.map((category, index) => (
            <div
              key={index}
              className="_hm_CtgItem"
              onClick={() =>
                navigate(`/shop/${category.category_name.toLowerCase()}`)
              }
            >
              <div className="text-left h-full w-3/5 p-3">
                <p className="font-bold"> {category.category_name} </p>
                <span className="block">10 items &rarr;</span>
              </div>
              <div className="w-2/5">
                <img src={apiUrl + category.category_image} alt="" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Struct>
  );
}

export default AllCategories;
