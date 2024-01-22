import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import useAxios from "../../../services/useAxios";
import { apiUrl } from "../../../services/constants";
import Sturct from "../../../components/frontend/Struct/Struct";
import Tracking from "../../../components/frontend/Tracking/Tracking";
import Invoice from "../../Invoice/Invoice";
import Loader from "../../../components/Loader/Loader";

function OrderView() {
  const api = useAxios();
  const { id } = useParams();
  const componentRef = useRef();
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`profile/my-orders/${id}`)
      .then((response) => {
        setOrderData(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {});
    // eslint-disable-next-line
  }, []);

  const handleInvoiceDownload = useReactToPrint({
    content: () => componentRef.current,
  });

  const formatOrderDate = (order_date) => {
    let date = new Date(order_date);
    let options = { day: "numeric", month: "short", year: "numeric" };
    let formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <Sturct>
      <div className="flex justify-center items-center h-full">
        <div className="bg-white text-primary-color w-full md:w-1/2 p-10 shadow-md">
          <div className="flex justify-between items-center">
            <p className="font-bold text-lg md:text-2xl">
              ORDER ID: {orderData.order_no}
            </p>
            <button
              onClick={handleInvoiceDownload}
              className="text-xs bg-primary-color w-max px-2 text-white md:px-3 py-2 rounded-md"
            >
              <FontAwesomeIcon icon={faDownload} />{" "}
              <span className="hidden md:inline">Download Invoice</span>
            </button>
          </div>
          <small className="block text-gray-500 my-3">
            Order Date: <b>{formatOrderDate(orderData.created_at)}</b>
          </small>
          <hr />
          <div className="my-3">
            {orderData.orderItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row md:justify-between my-2"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={apiUrl + item.product.image}
                    alt=""
                    className="w-[100px] rounded-md border border-gray-200 p-1"
                  />
                  <div className="">
                    <p className="font-bold text-primary-color capitalize text-ellipsis line-clamp-1">
                      {item.product.product_name}
                    </p>
                    <small className="block text-gray-400">
                      {Object.entries(item.product.product_attributes).map(
                        ([attr, value], index) => (
                          <span key={index}>
                            {index !== 0 && " |"} {value}
                          </span>
                        )
                      )}
                    </small>
                    <small className="block text-primary-color">
                      &#8377;{item.price.toLocaleString("en-IN")}{" "}
                    </small>
                  </div>
                </div>
                <div className="my-auto text-right">
                  <p className="font-bold text-base md:text-lg">
                    &#8377;{item.price.toLocaleString("en-IN")}{" "}
                  </p>
                  <small className="block text-gray-400">Qty: 3</small>
                </div>
              </div>
            ))}
          </div>
          <hr />
          <div className="hidden">
            <Invoice ref={componentRef} id={id} />
          </div>
          <div className="my-3">
            <Tracking />
          </div>
          <hr />
          <div className="flex my-3">
            <div className="w-full md:w-1/2">
              <p className="font-bold text-lg">Payment</p>
              <small className="block my-1 text-gray-600">
                CASH ON DELIVERY
              </small>
            </div>
            <div className="w-full md:w-1/2">
              <p className="font-bold">Delivery</p>
              <small className="block my-1 text-gray-400">ADDRESS</small>
              <p className="my-1 text-gray-600">
                <small
                  className={`text-white p-1 text-xs ${
                    orderData.type === "Home" ? "" : "bg-orange-600"
                  }`}
                >
                  {orderData.type}
                </small>{" "}
                {"  "}
                {orderData.house_name}, {orderData.road_name}, {orderData.city},{" "}
                {orderData.district}, {orderData.state},{" "}
                <span className="font-bold">{orderData.pincode}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Sturct>
  );
}

export default OrderView;
