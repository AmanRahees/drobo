import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import useAxios from "../../../services/useAxios";
import { apiUrl } from "../../../services/constants";
import Struct from "../../../components/backend/Struct/Struct";
import DeleteProduct from "./DeleteProduct";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./product.css";

function Products() {
  const api = useAxios();
  const navigate = useNavigate();
  const [productsData, setProductsData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  useEffect(() => {
    api
      .get("admin/products")
      .then((response) => {
        setProductsData(response.data);
      })
      .catch((error) => {
        toast.error("Failed to take Data");
      });
    // eslint-disable-next-line
  }, []);
  const handleSelected = (id) => {
    if (selected.includes(id)) {
      setSelected((prevSelected) =>
        prevSelected.filter((selectedId) => selectedId !== id)
      );
    } else {
      setSelected((prevSelected) => [...prevSelected, id]);
    }
  };
  const hanldeToastMessages = (type, message) => {
    if (type === "success") {
      toast.success(message);
    } else if (type === "error") {
      toast.error(message);
    }
  };
  const handleStatusChange = async (id) => {
    const updatedData = productsData.map((item) =>
      item.id === id ? { ...item, status: !item.status } : item
    );
    const itemData = updatedData.find((product) => product.id === id);
    await api
      .put(`admin/products/${id}`, { status: itemData.status })
      .then((response) => {
        if (response.status === 200) {
          setProductsData(updatedData);
          toast.success("Updated Successfully!");
        }
      })
      .catch((error) => {
        toast.error("Error Occured!");
      });
  };
  return (
    <Struct>
      <div className="float-right flex flex-col-reverse md:flex-row gap-2 mb-2">
        {selected.length > 0 && (
          <button
            onClick={() => setDeleteModal(true)}
            className="bg-red-600 py-1 px-3 rounded-md"
          >
            <FontAwesomeIcon icon={faTrash} /> ({selected.length})
          </button>
        )}
        <Link
          className="bg-sub-color py-1 px-3 rounded-md"
          to="/admin/products/add"
        >
          Add +
        </Link>
      </div>
      <h1 className="text-3xl md:text-4xl text-sub-color">Products</h1>

      <div className="pl-searchBox">
        <input type="text" placeholder="Search..." />
        <FontAwesomeIcon icon={faSearch} className="pl-searchIcon" />
      </div>

      <div className="_pdtBox">
        {productsData.map((product, index) => (
          <div key={index} className="_pdtItem">
            <img src={`${apiUrl}${product.base_image}`} alt="" />
            <input
              type="checkbox"
              className="_pdtCheckBox"
              onChange={() => handleSelected(product.id)}
              checked={selected.includes(product.id)}
            />
            <div className="absolute top-2 right-3">
              <input
                type="checkbox"
                onChange={() => handleStatusChange(product.id)}
                checked={product.status}
                className="togglerInput my-2 float-end"
              />
            </div>
            <div className="_pdtDown">
              <button
                onClick={() => navigate(`/admin/products/${product.id}`)}
                className="float-end bg-blue-900 p-2 px-2 rounded text-sm"
              >
                <FontAwesomeIcon icon={faPen} />
              </button>
              <h1>{product.product_name}</h1>
              <span className="my-1">
                Category : <b>{product.category.category_name}</b>
              </span>
              <span className="my-1">
                Brand : <b>{product.brand.brand_name}</b>
              </span>
              <button
                onClick={() => navigate(`${product.slug}/${product.id}`)}
                className="w-full mt-3 bg-black py-2 rounded-md"
              >
                View →
              </button>
            </div>
          </div>
        ))}
      </div>

      {deleteModal && (
        <DeleteProduct
          selectedIds={selected}
          setSelected={setSelected}
          setDeleteModal={setDeleteModal}
          setProductsData={setProductsData}
          hanldeToastMessages={hanldeToastMessages}
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

export default Products;
