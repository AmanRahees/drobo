import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Demo() {
  const btnclick = (e) => {
    e.preventDefault();
    toast.error("Invalid Password!");
  };
  return (
    <form onSubmit={btnclick}>
      <input type="text" />
      <button type="submit">submit</button>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        pauseOnHover={false}
      />
    </form>
  );
}

export default Demo;
