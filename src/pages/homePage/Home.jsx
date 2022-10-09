import React from "react";
import "./home.css";
import HomeImage from "../../images/home.png";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div className="container">
      <div className="left__content-container">
        <div className="content">
          <p>
            This is your time to enjoy all countries contents like photos and
            all what peaples say to every country.
          </p>
          <div className="button_container">
            <Link to="/allcountries">
              {" "}
              <button>Let's Start</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="right__content-container">
        <img src={HomeImage} alt="my home pic" />
      </div>
    </div>
  );
}

export default Home;
