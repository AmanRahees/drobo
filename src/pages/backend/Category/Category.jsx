import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";
import useAxios from "../../../services/useAxios";
import { apiUrl } from "../../../services/constants";
import Struct from "../../../components/backend/Struct/Struct";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";
import DeleteCategory from "./DeleteCategory";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./category.css";

function Category() {
  const api = useAxios();
  const [filter, setFilter] = useState("All");
  const [categoryData, setCategoryData] = useState([]);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  useEffect(() => {
    api.get("admin/category").then((response) => {
      if (response.status === 200) {
        setCategoryData(response.data);
      }
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
  return (
    <Struct>
      <button
        className="float-right bg-sub-color py-1 px-3 rounded-md"
        onClick={() => setAddModal(true)}
      >
        Add +
      </button>
      <h1 className="text-3xl md:text-4xl text-sub-color">Category</h1>

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
          onClick={() => setFilter("Disabled")}
          className={`${filter === "Disabled" ? "active" : null}`}
        >
          Disabled
        </button>
      </div>

      <div className="cbBox">
        {categoryData.map((item, index) => (
          <div key={index} className="cbItem">
            <img src={`${apiUrl}${item.category_image}`} alt="" />
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
              <h1>{item.category_name}</h1>
            </div>
          </div>
        ))}
      </div>

      {addModal && (
        <AddCategory
          setAddModal={setAddModal}
          hanldeToastMessages={hanldeToastMessages}
          setCategoryData={setCategoryData}
        />
      )}

      {editModal && (
        <EditCategory
          selectedId={selectedId}
          setEditModal={setEditModal}
          categoryData={categoryData}
          setCategoryData={setCategoryData}
          hanldeToastMessages={hanldeToastMessages}
        />
      )}

      {deleteModal && (
        <DeleteCategory
          selectedId={selectedId}
          setDeleteModal={setDeleteModal}
          hanldeToastMessages={hanldeToastMessages}
          setCategoryData={setCategoryData}
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

export default Category;
