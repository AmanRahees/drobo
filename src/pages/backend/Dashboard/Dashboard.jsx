import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSackDollar } from "@fortawesome/free-solid-svg-icons";
import Struct from "../../../components/backend/Struct/Struct";
import "./dashboard.css";

function Dashboard() {
  return (
    <Struct>
      <h1 className="text-4xl text-sub-color">Dashboard</h1>
      <span className="block">12 Dec 2022</span>

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
          <div class="go-corner">
            <div class="go-arrow">→</div>
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
          <div class="go-corner">
            <div class="go-arrow">→</div>
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
          <div class="go-corner">
            <div class="go-arrow">→</div>
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
          <div class="go-corner">
            <div class="go-arrow">→</div>
          </div>
        </Link>
      </div>
    </Struct>
  );
}

export default Dashboard;
