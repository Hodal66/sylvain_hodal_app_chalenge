import React, { useState } from "react";
import "./sign.css";
import Logo from "../../images/LOGO.png";
import { Link, useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { AUTH_TOKEN } from "../../constants";
import jwt_decode from "jwt-decode";

const LOGIN_USER = gql`
  mutation login_user($email: String!, $password: String!) {
    login_user(email: $email, password: $password) {
      token
      user {
        email
        firstName
        secondName
        _id
      }
    }
  }
`;

function SignIn() {
 let navigate = useNavigate();
 const [emailInput, setEmailInput] = useState("");
 const [passwordInput, setPasswordInput] = useState("");

  const handleEmailChange = (e) => {
    setEmailInput(e.target.value);
  };

   const handlePasswordChange = (e) => {
  setPasswordInput(e.target.value)
   };

 const [fetch_Login_user, { loading }] = useMutation(LOGIN_USER, {
   variables: {
     email: emailInput,
     password: passwordInput,
   },
   onCompleted: ({ login_user }) => {
    console.log(login_user)
     localStorage.setItem(AUTH_TOKEN, login_user.token);
     const userIdFetched = jwt_decode(localStorage.getItem(AUTH_TOKEN));
     console.log(userIdFetched);
    //  navigate(`user/${userIdFetched.userId}`);
     navigate(`/allcountries`);
   },
   onError: (errors) => {
     console.log(errors);
     navigate("/");
   },
 });
 const handleClick = (event) => {
   event.preventDefault();
   if (!emailInput || !passwordInput) return;
   fetch_Login_user();
 };
  return (
    <div className="container_sign_in bg-blue-900">
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
        <div className="input__container bg-blue-300">
          <div className="inputs">
            <div className="email">
              <input
                type="email"
                placeholder="Enter your Email"
                onChange={handleEmailChange}
                name="email"
                value={emailInput}
              />
            </div>
            <div className="password">
              <input
                type="password"
                placeholder="Enter your password"
                onChange={handlePasswordChange}
                name="password"
                value={passwordInput}
              />
            </div>
          </div>

          <div className="button_container">
            <button
              className="btn btn_green bg-blue-700 hover:bg-blue-400"
              onClick={handleClick}
              type="submit"
            >
              Send
            </button>
            <Link to="/">
              <button
                className="btn btn_red bg-red-700 hover:bg-red-400"
                onClick={(e) => {
                  setEmailInput("");
                  setPasswordInput("")
                  // setModal(false);
                }}
              >
                Cancel
              </button>
            </Link>
          </div>
          <div className="goto_signin_page">
            <p id="already" className="text-blue-900">
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
