import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSackDollar } from "@fortawesome/free-solid-svg-icons";
import Struct from "../../../components/backend/Struct/Struct";
import "./dashboard.css";

function Dashboard() {
  const getTodaysDate = () => {
    let date = new Date();
    let options = { day: "numeric", month: "short", year: "numeric" };
    let formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  };
  return (
    <Struct>
      <h1 className="text-2xl md:text-4xl">Dashboard</h1>
      <small className="block">{getTodaysDate()}</small>

      <div className="pl-cardBox">
        <Link className="pl-card">
          <h1 className="text-2xl">
            Income{" "}
            <FontAwesomeIcon
              className="float-right text-4xl"
              icon={faSackDollar}
            />
          </h1>
          <p className="cardValue">$282374</p>
          <div className="go-corner">
            <div className="go-arrow">→</div>
          </div>
        </Link>
        <Link className="pl-card">
          <h1 className="text-2xl">
            Income{" "}
            <FontAwesomeIcon
              className="float-right text-4xl"
              icon={faSackDollar}
            />
          </h1>
          <p className="cardValue">$282374</p>
          <div className="go-corner">
            <div className="go-arrow">→</div>
          </div>
        </Link>
        <Link className="pl-card">
          <h1 className="text-2xl">
            Income{" "}
            <FontAwesomeIcon
              className="float-right text-4xl"
              icon={faSackDollar}
            />
          </h1>
          <p className="cardValue">$282374</p>
          <div className="go-corner">
            <div className="go-arrow">→</div>
          </div>
        </Link>
        <Link className="pl-card">
          <h1 className="text-2xl">
            Income{" "}
            <FontAwesomeIcon
              className="float-right text-4xl"
              icon={faSackDollar}
            />
          </h1>
          <p className="cardValue">$282374</p>
          <div className="go-corner">
            <div className="go-arrow">→</div>
          </div>
        </Link>
      </div>
    </Struct>
  );
}

export default Dashboard;
