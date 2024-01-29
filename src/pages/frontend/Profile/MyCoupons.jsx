import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faTicket } from "@fortawesome/free-solid-svg-icons";
import useAxios from "../../../services/useAxios";
import Struct from "../../../components/frontend/Struct/Struct";
import Account from "../../../components/frontend/Account/Account";
import Loader from "../../../components/Loader/Loader";
import "./profile.css";

function MyCoupons() {
  const api = useAxios();
  const [myCoupons, setMyCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api
      .get("profile/coupon")
      .then((response) => {
        setMyCoupons(response.data);
        setLoading(false);
      })
      .catch((error) => {});
    // eslint-disable-next-line
  }, []);
  const handleCouponActive = (id) => {
    api
      .put(`profile/coupon/${id}`)
      .then((resonse) => {
        const updatedCoupons = myCoupons.map((coupon) => {
          if (coupon.id === id) {
            return { ...coupon, is_active: !coupon.is_active };
          } else if (coupon.is_active) {
            return { ...coupon, is_active: false };
          } else {
            return coupon;
          }
        });
        setMyCoupons(updatedCoupons);
      })
      .catch((error) => {});
  };
  const formatDate = (theDate) => {
    let date = new Date(theDate);
    let options = { day: "numeric", month: "short", year: "numeric" };
    let formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  };
  const isExpired = (theExpDate) => {
    let expDate = new Date(theExpDate);
    let currentDate = new Date();
    return expDate < currentDate;
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <Struct>
      <Account>
        <p className="text-base md:text-2xl font-bold">Coupons</p>
        {myCoupons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-3">
            {myCoupons.map((coupon, index) => (
              <div
                key={index}
                className="relative flex bg-gray-200 rounded-xl overflow-hidden"
              >
                {!coupon.is_used && isExpired(coupon.coupon.expiration) && (
                  <div
                    className="absolute h-full w-full flex justify-center items-end"
                    style={{ background: "#00000088" }}
                  >
                    <p className="bg-teal-950 text-red-600 w-full text-center py-3">
                      Expired
                    </p>
                  </div>
                )}
                {coupon.is_used && (
                  <div
                    className="absolute h-full w-full flex justify-center items-end 0"
                    style={{ background: "#00000088" }}
                  >
                    <p className="bg-teal-950 text-green-600 w-full text-center py-3">
                      Redeemed
                    </p>
                  </div>
                )}
                <div className="p-5 w-3/5">
                  <p className="font-bold text-base md:text-lg">
                    Get {coupon.coupon.coupon_value}% off
                  </p>
                  <small className="block whitespace-nowrap">
                    Expires{" "}
                    <b className="text-red-600 md:text-sm">
                      {formatDate(coupon.coupon.expiration)}
                    </b>
                  </small>
                </div>
                <div className="text-center p-5 bg-primary-color text-white w-2/5">
                  <p className="font-bold text-lg md:text-2xl">
                    {coupon.coupon.coupon_code}
                  </p>
                  {coupon.is_active === true ? (
                    <button
                      onClick={() => handleCouponActive(coupon.id)}
                      className="text-xs text-green-700"
                    >
                      On Use
                    </button>
                  ) : (
                    <button
                      onClick={() => handleCouponActive(coupon.id)}
                      className="text-xs text-sky-700"
                    >
                      Activate
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center aspect-video">
            <div className="flex flex-col items-center">
              <div className="relative">
                <FontAwesomeIcon
                  icon={faTicket}
                  className="text-[120px] text-gray-800"
                />
                <div className="absolute bottom-2 right-0">
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="text-3xl text-red-600 bg-white rounded-full"
                  />
                </div>
              </div>
              <p className="text-center text-lg font-bold text-primary-color">
                You have no Coupons
              </p>
            </div>
          </div>
        )}
      </Account>
    </Struct>
  );
}

export default MyCoupons;
