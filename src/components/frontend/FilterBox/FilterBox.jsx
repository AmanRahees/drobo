import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import "./filter.css";

function FilterBox() {
  const [showFilter, setShowFilter] = useState(true);
  const [showCategory, setShowCategory] = useState(true);
  const [showBrand, setShowBrand] = useState(true);
  return (
    <>
      <div className="_top_filterBox">
        <h1>Filters</h1>
        <button
          className={`angleBtn_ ${showFilter ? "active" : ""}`}
          onClick={() => setShowFilter(!showFilter)}
        >
          <FontAwesomeIcon icon={faAngleDown} />
        </button>
      </div>
      {
        <div className={`_content_filterBox ${showFilter ? "active" : ""}`}>
          <>
            <div className="_aBox_filterBox">
              <div className="_evyH_filter">
                <h1>Category</h1>
                <button
                  className={`ctgyAngleBtn_ ${showCategory ? "active" : ""}`}
                  onClick={() => setShowCategory(!showCategory)}
                >
                  <FontAwesomeIcon icon={faAngleDown} />
                </button>
              </div>
              <div className={`_ctgy_filters ${showCategory ? "active" : ""}`}>
                <label className="block p-1 ml-3 mt-3">
                  <input type="checkbox" /> Mobile
                </label>
                <label className="block p-1 ml-3">
                  <input type="checkbox" /> Mobile
                </label>
                <label className="block p-1 ml-3">
                  <input type="checkbox" /> Mobile
                </label>
                <label className="block p-1 ml-3">
                  <input type="checkbox" /> Mobile
                </label>
              </div>
            </div>
            <div className="_aBox_filterBox">
              <div className="_evyH_filter">
                <h1>Brand</h1>
                <button
                  className={`brndAngleBtn_ ${showBrand ? "active" : ""}`}
                  onClick={() => setShowBrand(!showBrand)}
                >
                  <FontAwesomeIcon icon={faAngleDown} />
                </button>
              </div>
              <div className={`_brnd_filters ${showBrand ? "active" : ""}`}>
                <label className="block p-1 ml-3 mt-3">
                  <input type="checkbox" /> Mobile
                </label>
                <label className="block p-1 ml-3">
                  <input type="checkbox" /> Mobile
                </label>
                <label className="block p-1 ml-3">
                  <input type="checkbox" /> Mobile
                </label>
                <label className="block p-1 ml-3">
                  <input type="checkbox" /> Mobile
                </label>
              </div>
            </div>
            <div className="_aBox_filterBox">
              <div className="_evyH_filter">
                <h1>Price</h1>
                <button
                  className={`text-green-900 text-sm`}
                  onClick={() => setShowBrand(!showBrand)}
                >
                  Clear
                </button>
              </div>
              <div className="mt-2">
                <input type="range" className="w-full" />
              </div>
            </div>
          </>
        </div>
      }
    </>
  );
}

export default FilterBox;
