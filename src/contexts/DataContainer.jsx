import React, { useState, useEffect, createContext, useContext } from "react";
import AuthContext from "./AuthContext";
import axiosInstance from "../services/axios";
import useAxios from "../services/useAxios";

const DataContainer = createContext();

export const ShopDataProvider = ({ children }) => {
  const api = useAxios();
  const { setLoading, userData } = useContext(AuthContext);
  const [categoryData, setCategoryData] = useState([]);
  const [brandsData, setBrandData] = useState([]);
  const [cartCounter, setCartCounter] = useState(0);

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get("contexts/get-descriptors")
      .then((response) => {
        setCategoryData(response.data.category);
        setBrandData(response.data.brands);
      })
      .catch((error) => {
        console.log(error);
      });
    if (userData) {
      getUserItems();
    }
    setLoading(false);
    // eslint-disable-next-line
  }, [setLoading]);

  const getUserItems = () => {
    api
      .get("contexts/get-user-items")
      .then((response) => {
        setCartCounter(response.data.cart_counter);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let ContextData = {
    category_data: categoryData,
    brands_data: brandsData,
    cartCounter: cartCounter,
  };

  return (
    <DataContainer.Provider value={ContextData}>
      {children}
    </DataContainer.Provider>
  );
};

export default DataContainer;
