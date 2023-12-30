import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./struct.css";

const Struct = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="__body__">{children}</div>
      <Footer />
    </>
  );
};

export default Struct;
