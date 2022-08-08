import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  return (
    <div className="header">
      <div className="header_reg">
        <Link to="/login">
          <p className="header_link">Login</p>
        </Link>
      </div>
      <div className="header_reg">
        <Link to="/register">
          <p className="header_link">Register</p>
        </Link>
      </div>
    </div>
  );
};

export default Header;
