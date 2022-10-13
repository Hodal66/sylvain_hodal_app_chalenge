import React from "react";
import "./navBar.css";
import Logo from "../images/LOGO.png";
import { Link } from "react-router-dom";
function NavBar() {
  return (
    <div className=" nav_container bg-blue-900">
      <div className="nav_logo_container">
        <Link to="/">
          <img src={Logo} alt="my logo" className="logo__image" />
        </Link>
      </div>
      <div className="navigation_links ">
        <ul className="navigation__links-container">
          <li>
            <Link to="/" className="btn">
              Home
            </Link>
          </li>

          <li>
            <Link to="/allcountries" className="btn " id="long_btn">
              All countries
            </Link>
          </li>

          <li>
            <Link to="/signin" className="btn">
              sign in
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
