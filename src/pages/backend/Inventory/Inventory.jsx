import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartFlatbed, faSearch } from "@fortawesome/free-solid-svg-icons";
import useAxios from "../../../services/useAxios";
import { apiUrl } from "../../../services/constants";
import Struct from "../../../components/backend/Struct/Struct";
import ManageItem from "./ManageItem";
import Loader from "../../../components/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Inventory() {
  const api = useAxios();
  const pageSize = 12;
  const [inventory, setInventory] = useState([]);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedId, setSelectedId] = useState(0);
  const [editModal, setEditModal] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api.get(`admin/variants?page=${page}`).then((response) => {
      setInventory(response.data.results);
      setTotalItems(response.data.count);
      setLoading(false);
    });
    // eslint-disable-next-line
  }, [page]);
  const getTotalPages = () => Math.ceil(totalItems / pageSize);
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= getTotalPages()) {
      setPage(newPage);
    }
  };
  const handleStatusChange = async (id) => {
    const updatedData = inventory.map((item) =>
      item.id === id ? { ...item, status: !item.status } : item
    );
    const itemData = updatedData.find((product) => product.id === id);
    await api
      .put(`admin/variants/${id}`, { status: itemData.status })
      .then((response) => {
        setInventory(updatedData);
        toast.success("Updated Successfully");
      })
      .catch((error) => {
        toast.error("Updation Failed!");
      });
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <Struct>
      <h1 className="text-3xl md:text-4xl">Inventory</h1>

      {inventory.length > 0 ? (
        <>
          <form className="pl-searchBox">
            <input type="text" placeholder="Search..." />
            <FontAwesomeIcon icon={faSearch} className="pl-searchIcon" />
          </form>

          <table className="backendTable">
            <thead className="text-left">
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Price</th>
                <th>Stock</th>
                <th>On Order</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="text-left">
              {inventory.map((item, index) => (
                <tr key={index}>
                  <td className="relative">
                    <input
                      type="checkbox"
                      className="_pdtCheckBox translate-y-3/4"
                    />
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <img
                        src={apiUrl + item.image}
                        alt=""
                        className="w-[60px] aspect-square"
                      />
                      <div className="flex flex-col justify-center">
                        <p
                          className="font-bold text-sm text-cyan-500 cursor-pointer"
                          onClick={() => {
                            setEditModal(true);
                            setSelectedId(item.id);
                          }}
                        >
                          {item.product}
                        </p>
                        <small className="text-xs text-gray-400">
                          (
                          {Object.entries(item.product_attributes).map(
                            ([attr, value], index) => (
                              <span key={index}>
                                {index !== 0 && ", "}
                                {value}
                              </span>
                            )
                          )}
                          )
                        </small>
                      </div>
                    </div>
                  </td>
                  <td>&#8377;{item.price.toLocaleString("en-IN")}</td>
                  <td>
                    <span
                      className={`py-1 px-3 rounded-xl text-sm ${
                        item.stock > 0
                          ? `${
                              item.stock > 10
                                ? "bg-green-950 text-green-600"
                                : "bg-yellow-950 text-yellow-200"
                            }`
                          : "bg-red-950 text-red-400"
                      }`}
                    >
                      {item.stock !== 0 ? `${item.stock} pcs` : "Out of stock"}
                    </span>
                  </td>
                  <td>
                    <small>-</small>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      className="togglerInput scale-[0.8]"
                      onChange={() => handleStatusChange(item.id)}
                      checked={item.status}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end my-3">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="p-2 bg-121 w-[40px] h-[40px] border border-neutral-900"
            >
              {"<"}
            </button>
            {Array.from({ length: getTotalPages() }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                style={{ fontWeight: page === index + 1 ? "bold" : "normal" }}
                className={`p-2 ${
                  page === index + 1 ? "bg-sub-color" : "bg-121"
                } w-[40px] h-[40px] border border-neutral-900`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === getTotalPages()}
              className="p-2 bg-121 w-[40px] h-[40px] border border-neutral-900"
            >
              {">"}
            </button>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-full">
          <div className="flex flex-col items-center">
            <FontAwesomeIcon icon={faCartFlatbed} className="text-9xl" />
            <p className="text-center my-3 text-2xl">Inventory is Empty!</p>
            <Link
              to="/admin/products/add"
              className="text-sm px-3 py-1 bg-sub-color text-center"
            >
              + Add Product
            </Link>
          </div>
        </div>
      )}
      {editModal && (
        <ManageItem
          setEditModal={setEditModal}
          selectedId={selectedId}
          inventory={inventory}
          setInventory={setInventory}
        />
      )}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnHover={false}
        theme="dark"
      />
    </Struct>
  );
}

export default Inventory;
