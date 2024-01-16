import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrash,
  faSearch,
  faBox,
} from "@fortawesome/free-solid-svg-icons";
import Struct from "../../../components/backend/Struct/Struct";
import Loader from "../../../components/Loader/Loader";
import useAxios from "../../../services/useAxios";
import { apiUrl } from "../../../services/constants";
import AddBrands from "./AddBrands";
import EditBrands from "./EditBrands";
import DeleteBrands from "./DeleteBrands";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./brands.css";

function Brands() {
  const api = useAxios();
  const [filter, setFilter] = useState("All");
  const [brandsData, setBrandsData] = useState([]);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api
      .get("admin/brand")
      .then((response) => {
        if (response.status === 200) {
          setBrandsData(response.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        toast.warning("Server out!");
      });
    // eslint-disable-next-line
  }, []);
  const hanldeToastMessages = (type, message) => {
    if (type === "success") {
      toast.success(message);
    } else if (type === "error") {
      toast.error(message);
    }
  };
  const handleTrashSelect = (id) => {
    setSelectedId(id);
    setDeleteModal(true);
  };
  const handleEditSelect = (id) => {
    setSelectedId(id);
    setEditModal(true);
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <Struct>
      <button
        className="float-right bg-sub-color py-1 px-3 rounded-md"
        onClick={() => setAddModal(true)}
      >
        Add +
      </button>
      <h1 className="text-3xl md:text-4xl text-sub-color">Brands</h1>

      {brandsData.length > 0 ? (
        <>
          <div className="pl-searchBox">
            <input type="text" placeholder="Search..." />
            <FontAwesomeIcon icon={faSearch} className="pl-searchIcon" />
          </div>

          <div className="pl_filter my-4">
            <button
              onClick={() => setFilter("All")}
              className={`${filter === "All" ? "active" : null}`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("Newest")}
              className={`${filter === "Newest" ? "active" : null}`}
            >
              Newest
            </button>
            <button
              onClick={() => setFilter("Oldest")}
              className={`${filter === "Oldest" ? "active" : null}`}
            >
              Oldest
            </button>
            <button
              onClick={() => setFilter("Most Used")}
              className={`${filter === "Most Used" ? "active" : null}`}
            >
              Most Used
            </button>
          </div>

          <div className="cbBox">
            {brandsData.map((item, index) => (
              <div key={index} className="cbItem">
                <img src={`${apiUrl}${item.brand_image}`} alt="" />
                <div className="cbInfo">
                  <div className="float-right flex items-center gap-2">
                    <button
                      className="cb_pen"
                      onClick={() => handleEditSelect(item.id)}
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </button>
                    <button
                      className="cb_trash"
                      onClick={() => handleTrashSelect(item.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                  <h1>{item.brand_name}</h1>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-full">
          <div className="flex flex-col">
            <FontAwesomeIcon icon={faBox} className="text-9xl" />
            <p className="text-center my-3 text-2xl">No Brands Found!</p>
          </div>
        </div>
      )}

      {addModal && (
        <AddBrands
          setAddModal={setAddModal}
          hanldeToastMessages={hanldeToastMessages}
          setBrandsData={setBrandsData}
        />
      )}

      {editModal && (
        <EditBrands
          selectedId={selectedId}
          setEditModal={setEditModal}
          brandsData={brandsData}
          setBrandsData={setBrandsData}
          hanldeToastMessages={hanldeToastMessages}
        />
      )}

      {deleteModal && (
        <DeleteBrands
          selectedId={selectedId}
          setDeleteModal={setDeleteModal}
          hanldeToastMessages={hanldeToastMessages}
          setBrandsData={setBrandsData}
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

export default Brands;
