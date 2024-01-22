import React, { useState, useEffect } from "react";
import useAxios from "../../services/useAxios";
import "./invoice.css";

const Invoice = React.forwardRef((props, ref) => {
  const api = useAxios();
  const [orderData, setOrderData] = useState();
  useEffect(() => {
    api
      .get(`invoice/${props.id}`)
      .then((response) => {
        setOrderData(response.data);
      })
      .catch((error) => {});
    // eslint-disable-next-line
  }, []);
  const formatOrderDate = (order_date) => {
    let date = new Date(order_date);
    let options = { day: "numeric", month: "short", year: "numeric" };
    let formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  };
  const getTodaysDate = () => {
    let today = new Date();
    let options = { day: "numeric", month: "short", year: "numeric" };
    let formattedDate = today.toLocaleDateString("en-US", options);
    return formattedDate;
  };
  return (
    <div ref={ref} className="invoice">
      <p className="font-bold text-center text-[32px]">Invoice</p>
      <div className="flex justify-between items-start my-5">
        <div className="w-2/3">
          <p className="font-bold">
            Bill To: <br /> {orderData?.full_name}
          </p>
          <span className="block">
            {orderData?.house_name}, {orderData?.road_name} <br />{" "}
            {orderData?.city},{orderData?.district}, {orderData?.state}
          </span>
          <span className="">{orderData?.pincode}</span>
        </div>
        <div className="">
          <div className="mb-3">
            <p className="border border-gray-500 border-dashed inline p-2">
              <span className="font-bold">Invoice No: # FAEWOY2413</span>
            </p>
          </div>
          <p className="m-1">
            <span className="font-bold">Invoice Date: </span>
            {getTodaysDate()}
          </p>
          <p className="m-1">
            <span className="font-bold">Order ID: {orderData?.order_no}</span>
          </p>
          <p className="m-1">
            <span className="font-bold">
              Order Date: {formatOrderDate(orderData?.created_at)}
            </span>
          </p>
        </div>
      </div>
      <hr className="border-gray-500 my-4" />
      <table className="invoiceTable">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orderData?.orderItems.map((item, index) => (
            <tr key={index}>
              <td className="w-1/3">
                <p className="font-bold text-primary-color capitalize text-ellipsis line-clamp-2">
                  {item.product.product_name}
                </p>
                <small className="block text-gray-500">
                  {Object.entries(item.product.product_attributes).map(
                    ([attr, value], index) => (
                      <span key={index}>
                        {index !== 0 && ", "} {value}
                      </span>
                    )
                  )}
                </small>
              </td>
              <td>&#8377;{item.product.price.toLocaleString("en-IN")}</td>
              <td>{item.quantity}</td>
              <td>&#8377;{item.price.toLocaleString("en-IN")}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end my-5">
        <div className="text-right">
          <p className="font-bold mb-1">
            Sub Total:{" "}
            <span className="text-lg">
              &#8377;{orderData?.total_price.toLocaleString("en-IN")}
            </span>
          </p>
          <p className="font-bold mb-1">
            Discount:{" "}
            <span className="text-lg">
              &#8377;{orderData?.discount_price.toLocaleString("en-IN")}
            </span>
          </p>
          <h1 className="font-bold text-xl">
            Grand Total: &#8377;{orderData?.grand_total.toLocaleString("en-IN")}
          </h1>
        </div>
      </div>
      <hr className="border-gray-500 my-4" />
      <div className="flex justify-end my-5">
        <div className="">
          <h1 className="font-bold text-xl">drobo.</h1>
          <p className="font-light text-lg">Thank You!</p>
          <span className="font-light text-xs">For Shopping with us</span>
        </div>
      </div>
    </div>
  );
});

export default Invoice;
