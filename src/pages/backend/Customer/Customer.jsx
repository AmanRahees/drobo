import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Struct from "../../../components/backend/Struct/Struct";
import "./customers.css";

function Customer() {
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
            <th>Phone</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Aman Rahees</td>
            <td className="text-sub-color cursor-pointer">
              amanrahees@gmail.com
            </td>
            <td>-</td>
            <td>
              <input type="checkbox" className="togglerInput" />
            </td>
          </tr>
        </tbody>
      </table>
    </Struct>
  );
}

export default Customer;
