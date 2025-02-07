import React from "react";
import { ClipLoader } from "react-spinners";
import "./Loader.css";
const Loader = () => {
  return (
    <div
      className="blurLoader"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "10",
        height: "100vh",
        width: "100vw",
        textAlign: "center",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      <ClipLoader
        visible={true}
        height="80"
        width="80"
        color="green"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
