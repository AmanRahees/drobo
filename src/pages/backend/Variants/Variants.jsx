import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faTrash,
  faPen,
  faTableCells,
} from "@fortawesome/free-solid-svg-icons";
import useAxios from "../../../services/useAxios";
import { apiUrl } from "../../../services/constants";
import Struct from "../../../components/backend/Struct/Struct";
import Modal from "../../../components/backend/Modal/Modal";
import Loader from "../../../components/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Variants() {
  const api = useAxios();
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [variants, setVariants] = useState([]);
  const [selected, setSelected] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api
      .get(`admin/variants/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setProduct(response.data.product);
          setVariants(response.data.variants);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
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
    console.log(id);
  };
  const handleStatusChange = (id) => {
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
  const handleVariantsDelete = () => {
    setDeleteModal(false);
    api
      .delete("admin/variants", { data: selected })
      .then((response) => {
        setVariants((prevVariants) =>
          prevVariants.filter((variant) => !selected.includes(variant.id))
        );
        setSelected([]);
        hanldeToastMessages("success", "Deleted Successfull!");
      })
      .catch((error) => {
        hanldeToastMessages("error", "Error Occured!");
      });
  };
  if (loading) {
    return <Loader />;
  }
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
        <Link to="add" className="bg-sub-color py-1 px-3 rounded-md">
          Add +
        </Link>
      </div>
      <h1 className="text-3xl md:text-4xl capitalize">
        {product?.product_name}
      </h1>

      {variants.length > 0 ? (
        <>
          <div className="pl-searchBox">
            <input type="text" placeholder="Search..." />
            <FontAwesomeIcon icon={faSearch} className="pl-searchIcon" />
          </div>

          <div className="_pdtBox">
            {variants.map((variant, index) => (
              <div key={index} className="_pdtItem border border-121">
                <img src={`${apiUrl}${variant?.image}`} alt="" />
                <input
                  type="checkbox"
                  className="_pdtCheckBox"
                  onChange={() => handleSelected(variant?.id)}
                  checked={selected.includes(variant?.id)}
                />
                <div className="absolute top-2 right-3">
                  <input
                    type="checkbox"
                    onChange={() => handleStatusChange(product.id)}
                    checked={variant?.status}
                    className="togglerInput my-2 float-end"
                  />
                </div>
                <div className="_variantListDown_ p-2 overflow-hidden bg-121">
                  <button
                    onClick={() => navigate(`/admin/products/${variant?.id}`)}
                    className="float-end bg-blue-900 p-2 px-2 rounded text-sm"
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                  {Object.entries(variant.product_attributes).map(
                    ([attr, value]) => (
                      <span key={attr} className="my-1 block">
                        {attr} : <b>{value}</b>
                      </span>
                    )
                  )}
                  <h1> ₹{variant?.price.toLocaleString("en-IN")} </h1>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-full">
          <div className="flex flex-col">
            <FontAwesomeIcon icon={faTableCells} className="text-9xl" />
            <p className="text-center my-3 text-2xl">No Variants Found!</p>
          </div>
        </div>
      )}

      {deleteModal && (
        <Modal>
          <h1 className="modal-heading">Delete Product</h1>
          <div className="modal-divider"></div>
          <p className="modal-content">
            Are you sure that you want to delete this Variant?
          </p>
          <div className="modal-divider"></div>
          <div className="modal-btns">
            <button
              onClick={() => setDeleteModal(false)}
              className="bg-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={() => handleVariantsDelete()}
              className="bg-red-600"
            >
              Yes
            </button>
          </div>
        </Modal>
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

export default Variants;
