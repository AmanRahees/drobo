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
  const [userInfo, setUserInfo] = useState([]);
  const [cartCounter, setCartCounter] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [activeCoupon, setActiveCoupon] = useState([]);

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
      getUserInfo();
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
        setTotalAmount(response.data.total_amount);
        setActiveCoupon(response.data.active_coupon);
        setDiscountAmount(response.data.discount_amount);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUserInfo = () => {
    api
      .get("profile")
      .then((response) => {
        setUserInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let ContextData = {
    category_data: categoryData,
    brands_data: brandsData,
    setCartCounter: setCartCounter,
    cartCounter: cartCounter,
    setTotalAmount: setTotalAmount,
    totalAmount: totalAmount,
    activeCoupon: activeCoupon,
    setActiveCoupon: setActiveCoupon,
    discountAmount: discountAmount,
    setDiscountAmount: setDiscountAmount,
    userInfo: userInfo,
  };

  return (
    <DataContainer.Provider value={ContextData}>
      {children}
    </DataContainer.Provider>
  );
};

export default DataContainer;
