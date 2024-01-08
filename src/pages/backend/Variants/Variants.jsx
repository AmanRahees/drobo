import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import useAxios from "../../../services/useAxios";
import Struct from "../../../components/backend/Struct/Struct";

function Variants() {
  const api = useAxios();
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [variants, setVariants] = useState([]);
  const [selected, setSelected] = useState([]);
  useEffect(() => {
    api
      .get(`admin/products/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setProduct(response.data);
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
  };
  return (
    <Struct>
      <div className="float-right flex flex-col-reverse md:flex-row gap-2 mb-2">
        {selected.length > 0 && (
          <button
            // onClick={() => setDeleteModal(true)}
            className="bg-red-600 py-1 px-3 rounded-md"
          >
            <FontAwesomeIcon icon={faTrash} /> ({selected.length})
          </button>
        )}
        <Link className="bg-sub-color py-1 px-3 rounded-md" to="add">
          Add +
        </Link>
      </div>
      <h1 className="text-3xl md:text-4xl text-sub-color">
        {product?.product_name}
      </h1>
    </Struct>
  );
}

export default Variants;
