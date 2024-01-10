import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import "./filter.css";

function FilterBox() {
  const [showFilter, setShowFilter] = useState(true);
  const [filters, setFilters] = useState([]);
  return (
    <>
      <div className="_top_filterBox">
        <h1>Filters</h1>
        <button onClick={() => setShowFilter(!showFilter)}>
          <FontAwesomeIcon
            className={`_filterAngle ${showFilter ? "active" : ""}`}
            icon={faAngleDown}
          />
        </button>
      </div>
      <div className={`filterBox_content ${showFilter ? "" : "active"}`}>
        <form className="mb-3">
          <h1 className="text-primary-color pb-3">SELECTED FILTERS</h1>
          <div className="filtersHieght">
            <div className="filterBlock_contains my-1">
              <button type="button" className="filActives">
                MOBILES &times;
              </button>
              <button type="button" className="filActives">
                ELECTRONICS &times;
              </button>
              <button type="button" className="filActives">
                LAPTOPS &times;
              </button>
              <button type="button" className="filActives">
                USBS &times;
              </button>
              <button type="button" className="filActives">
                ACCESSORIES &times;
              </button>
              <button type="button" className="filActives">
                TABLETS &times;
              </button>
            </div>
          </div>
          <div className="flex justify-end pt-2 gap-1">
            <button
              type="button"
              className="text-sm bg-red-500 text-white px-2 py-1 rounded"
            >
              Clear
            </button>
            <button
              type="submit"
              className="text-sm bg-teal-700 rounded text-white px-3 py-1"
            >
              Apply
            </button>
          </div>
        </form>
        <hr className="mb-2" />
        <div className="mb-3">
          <h1 className="text-primary-color pb-3">CATEGORY</h1>
          <div className="filtersHieght">
            <div className="filterBlock_contains my-1">
              <button className="filOps active">MOBILES &times;</button>
              <button className="filOps">ELECTRONICS</button>
              <button className="filOps">LAPTOPS</button>
              <button className="filOps">USBS</button>
              <button className="filOps">ACCESSORIES</button>
              <button className="filOps">TABLETS</button>
            </div>
          </div>
        </div>
        <hr className="mb-2" />
        <div className="">
          <h1 className="text-primary-color pb-3">BRANDS</h1>
          <div className="filtersHieght">
            <div className="filterBlock_contains my-1">
              <button className="filOps active">MOBILES &times;</button>
              <button className="filOps">ELECTRONICS</button>
              <button className="filOps">LAPTOPS</button>
              <button className="filOps">USBS</button>
              <button className="filOps">ACCESSORIES</button>
              <button className="filOps">TABLETS</button>
            </div>
          </div>
        </div>
        <hr />
      </div>
    </>
  );
}

export default FilterBox;
