import React, { useState } from "react";
import "./sign.css";
import Logo from "../../images/LOGO.png";
import { Link, useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { AUTH_TOKEN } from "../../constants";
import jwt_decode from "jwt-decode";
import RingLoader from "react-spinners/RingLoader";


const SIGNUP_USER = gql`
  mutation Sign_up($input: UserSignUpInput) {
    sign_up(input: $input) {
      user {
        email
        password
        firstName
        secondName
        _id
      }
      token
    }
  }
`;

function SignUp() {

  let navigate = useNavigate();
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [firstNameInput, setFirstNameInput] = useState("");
  const [secondNameInput, setSecondNameInput] = useState("");

  const handleEmailChange = (e) => {
    setEmailInput(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPasswordInput(e.target.value);
  };

  const handleFirstNameChange = (e) => {
    setFirstNameInput(e.target.value);
  }

    const handleSecondNameChange = (e) => {
      setSecondNameInput(e.target.value);
    };

  const [fetch_Signup_user, { loading }] = useMutation(SIGNUP_USER, {
    variables: {
      input: {
        email: emailInput,
        password: passwordInput,
        firstName: firstNameInput,
        secondName: secondNameInput,
      },
    },
    onCompleted: ({ sign_up }) => {
      console.log(sign_up);
      localStorage.setItem(AUTH_TOKEN, sign_up.token);
      //  const userIdFetched = jwt_decode(localStorage.getItem(AUTH_TOKEN));
      const token = localStorage.getItem(AUTH_TOKEN);
      const userIdFetched =
        token && jwt_decode(localStorage.getItem(AUTH_TOKEN));
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
    fetch_Signup_user();
  };

const color = "white";
const override = {
  display: "inline",
  margin: "0 auto",
};

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
            <p>Join the world</p>
            <p id="sign_up_txt">Sign up</p>
          </div>
        </div>
        <div className="input__container bg-blue-300">
          <div className="inputs">
            <div className="firstName">
              <input
                type="text"
                placeholder="First Name"
                onChange={handleFirstNameChange}
                name="firstName"
                value={firstNameInput}
              />
            </div>
            <div className="latName">
              <input
                type="text"
                placeholder="Second Name"
                onChange={handleSecondNameChange}
                name="secondName"
                value={secondNameInput}
              />
            </div>
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
            <Link to="/">
              <button className="btn bg-red-700 hover:bg-red-500">Cancel</button>
            </Link>
            <button
              onClick={handleClick}
              type="submit"
              className="btn btn_green text-blue-100 bg-blue-900 hover:bg-blue-700"
            >
              {loading ? (
                <div className="flex">
                  <span className="">SigningUp </span>
                  <span className="">
                    <svg
                      aria-hidden="true"
                      className="mr-1 w-5 h-5 inline-block text-gray-200 animate-spin dark:text-gray-600 fill-blue-700"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  </span>
                </div>
              ) : (
                <div>Sign Up</div>
              )}
            </button>
          </div>
          <div className="goto_signin_page">
            <p id="already" className="text-blue-700 hover:bg-blue-400 rounded">
              <span>
                <Link to="/signin">Already Have an Acount ? sign in</Link>
              </span>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
