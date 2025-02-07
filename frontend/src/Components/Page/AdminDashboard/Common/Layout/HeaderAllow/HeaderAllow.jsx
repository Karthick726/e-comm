import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header/Header";

const HeaderAllow = (props) => {
  const { setAdmin } = props;
  const location = useLocation();
  const headerPaths = [
    "/",
    "/service-add",
    "/manage/booking-details",
    "/manage/contact",
    "/manage/service",
    "/manage/user-contact",
    "/service-name"
  ];
  return (
    <>
      {headerPaths.includes(location.pathname) && (
        <Header setAdmin={setAdmin} />
      )}
    </>
  );
};

export default HeaderAllow;
