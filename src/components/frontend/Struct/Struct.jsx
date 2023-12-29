import React from "react";
import Navbar from "../Navbar/Navbar";

const Struct = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default Struct;
