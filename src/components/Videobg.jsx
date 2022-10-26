import React from "react";
import { Link } from "react-router-dom";
import "./video.css";
import MyVideoBackground from "../assets/earthVideo.mp4";
function Videobg() {
  return (
    <div className="hero">
      <video autoPlay loop muted>
        <source src={MyVideoBackground} type="video/mp4" />
      </video>

      <div className="video_content">
        <h1>
          Hello, again you're <br />
          Welcome to All countries{" "}
        </h1>

        <p className="paragraph_content">
          This site provide all details needs to know on every country like{" "}
          <br />
          photos, comments, fact Now this is your time to enjoy
        </p>

        <Link to="/allcountries">
          <button
            className=" bg-blue-900
          hover:bg-blue-500 hover:w-1/3 pr-8 pl-8 pt-2 pb-2  rounded-xl m-10"
          >
            Explore more
          </button>
        </Link>
        <Link to="/import_trainee">load data</Link>
      </div>
    </div>
  );
}

export default Videobg;
