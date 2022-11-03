import React from "react";
import "./navBar.css";
import Logo from "../images/LOGO.png";
import { Link, useNavigate } from "react-router-dom";
import { AUTH_TOKEN } from "../constants";
import jwt_decode from "jwt-decode";

function NavBar() {
const navigate = useNavigate();
  const signMeOut = (event) => {
    localStorage.setItem(AUTH_TOKEN, "");
           navigate("/");
  }
   const token = localStorage.getItem(AUTH_TOKEN);
   const userIdFetched = token && jwt_decode(localStorage.getItem(AUTH_TOKEN));
   const firstName = userIdFetched.firstName;
   const secondName = userIdFetched.secondName;
   const LoggedUserNameToDisplay =  firstName && firstName.charAt(0).toUpperCase() + ". " +
        secondName.charAt(0).toUpperCase() + secondName.toLowerCase().slice(1);

  //  console.log(token, userIdFetched)
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
            {token && userIdFetched && userIdFetched.userId.length > 0 ? (
              <button className="btn" onClick={signMeOut}>
                sign out
              </button>
            ) : (
              <Link to="/signin" className="btn">
                sign in
              </Link>
            )}
          </li>
          {userIdFetched && userIdFetched.userId.length > 0 && (
            <li className="btn pointer-events-none text-red-900" id="long_btn">
              {LoggedUserNameToDisplay}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
