import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faDownload } from "@fortawesome/free-solid-svg-icons";
import Sturct from "../../../components/frontend/Struct/Struct";
import Invoice from "../../Invoice/Invoice";

function Success(props) {
  const componentRef = useRef();
  const formatOrderDate = (order_date) => {
    let date = new Date(order_date);
    let options = { day: "numeric", month: "short", year: "numeric" };
    let formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  };
  const handleInvoiceDownload = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <Sturct>
      <div className="grid place-items-center">
        <div className="bg-white text-primary-color border border-slate-200 my-5 p-5 md:min-w-[450px]">
          <div className="text-center my-3">
            <FontAwesomeIcon
              icon={faCheckCircle}
              id="successCheck"
              className="text-[50px] text-green-600 my-3"
            />
            <p className="font-bold text-green-600">ORDER SUCCESS</p>
            <small>Thank you for your Purchase!</small>
          </div>
          <div className="hidden">
            <Invoice ref={componentRef} id={props?.responseData.id} />
          </div>
          <hr />
          <div className="text-center my-2">
            <small className="">Total Amount</small>
            <p className="text-3xl font-bold">
              &#8377;{props?.responseData.grand_total}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 my-3">
            <div className="border p-2 rounded-md bg-slate-50">
              <small className="text-gray-600">TRACKING NUMBER</small>
              <h1 className="font-bold">{props?.responseData.tracking_no}</h1>
            </div>
            <div className="border p-2 rounded-md bg-slate-50">
              <small className="text-gray-600">ORDER ID</small>
              <h1 className="font-bold">{props?.responseData.order_no}</h1>
            </div>
            <div className="border p-2 rounded-md bg-slate-50">
              <small className="text-gray-600">PAYMENT METHOD</small>
              <h1 className="font-bold">{props?.responseData.payment_mode}</h1>
            </div>
            <div className="border p-2 rounded-md bg-slate-50">
              <small className="text-gray-600">ORDER DATE</small>
              <h1 className="font-bold">
                {formatOrderDate(props?.responseData.created_at)}
              </h1>
            </div>
          </div>
          <button
            onClick={handleInvoiceDownload}
            className="w-full bg-primary-color text-white py-2 border rounded-md mb-2"
          >
            <FontAwesomeIcon icon={faDownload} className="mr-1" /> Download
            Invoice
          </button>
          <Link
            to="/"
            className="w-full block text-center bg-black text-white py-2 border rounded-md mb-2"
          >
            Continue Shopping &rarr;
          </Link>
        </div>
      </div>
    </Sturct>
  );
}

export default Success;
