import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Struct from "../../../components/backend/Struct/Struct";
import useAxios from "../../../services/useAxios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./customers.css";

function Customer() {
  const api = useAxios();
  const [usersData, setUsersData] = useState([]);
  useEffect(() => {
    api
      .get("admin/customers")
      .then((response) => {
        setUsersData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line
  }, []);
  const handleStatusChange = (id) => {
    api
      .put(`admin/customers/${id}`)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Updated Successfull");
          const updatedData = usersData.map((item) =>
            item.id === id ? { ...item, is_active: !item.is_active } : item
          );
          setUsersData(updatedData);
        }
      })
      .catch((error) => {
        toast.error("Something went Wrong!");
      });
  };
  return (
    <Struct>
      <h1 className="text-4xl text-sub-color">Customers</h1>

      <div className="pl-searchBox">
        <input type="text" placeholder="Search..." />
        <FontAwesomeIcon icon={faSearch} className="pl-searchIcon" />
      </div>

      <table className="backendTable">
        <thead>
          <tr>
            <th>Id</th>
            <th>Username</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {usersData.map((user, index) => (
            <tr key={index}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td className="text-sub-color cursor-pointer">{user.email}</td>
              <td>
                <input
                  type="checkbox"
                  checked={user.is_active}
                  onChange={() => handleStatusChange(user.id)}
                  className="togglerInput"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnHover={false}
        theme="dark"
      />
    </Struct>
  );
}

export default Customer;
