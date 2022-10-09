import React from "react";
import "./sign.css";
import Logo from "../../images/LOGO.png";
import { Link } from "react-router-dom";

function SignIn() {
  return (
    <div className="container_sign_in">
      <form action="">
        <div className="header_part">
          <div className="image_container">
            <Link to="/">
              <img src={Logo} alt="logo" />
            </Link>
          </div>
          <div className="header_contents">
            <p>Explore the world </p>
            <p id="sign_up_txt">Sign up</p>
          </div>
        </div>
        <div className="input__container">
          <div className="inputs">
            <div className="email">
              <input type="email" placeholder="Enter your Email" />
            </div>
            <div className="password">
              <input type="password" placeholder="Enter your password" />
            </div>
          </div>

          <div className="button_container">
            <Link to="/">
              <button className="btn btn_red">Cancel</button>
            </Link>
            <button className="btn btn_green">Send</button>
          </div>
          <div className="goto_signin_page">
            <p id="already">
              <span>
                <Link to="/signup">You don't Have an Acount ? sign up</Link>
              </span>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
