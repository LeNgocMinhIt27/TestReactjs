import React, { memo } from "react";
import "../assets/css/style/NotFoundPage.css";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404 - Page Not Found</h1>
      <p className="not-found-message">Trang không tồn tại</p>
      <Link to="/home" className="back-to-home-link">
        Quay trở lại trang chủ
      </Link>
    </div>
  );
};

export default memo(NotFoundPage);
