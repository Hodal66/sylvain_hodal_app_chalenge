import React, { useState } from "react";
import Card from "../UI/Card";
import { Link } from "react-router-dom";
function Countries({
  name,
  image,
  continent,
  country,
  city,
  setOpenModal,
  emoji,
  openModal,
}) {
  return (
    <div>
      <Card className="country">
        <div className="container-container">
          <div className="country_image-container border-sh ">
            <img src={image} alt={name} />
            <div className="image__content">
              <div className="left__side-content pb-4">
                <div className="text-xl text-white">
                  {name} , {city}
                </div>
                <div>{continent}</div>
              </div>
              <div className="right__side-content">{emoji}</div>
            </div>
          </div>
          <div className="buttons_controls-container flex gap-3">
            <div className="related__photos pl-2 w-32 opacity-70">
              <h1>Related_Photos</h1>
              <div className="add_photos-contents ">
                <button
                  className="plus_btn bg-white text-black  rounded pr-2 pl-2 "
                  onClick={() => {
                    setOpenModal(true);
                  }}
                >
                  +
                </button>

                <p>13,000 </p>
              </div>
              <div className="bg-white border rounded w-24 mt-3">
                <Link to="/gallery">
                  <button className="btn bg-blue-500 shadow-lg shadow-blue-500/50 text-xs text-white">
                    More Photos..
                  </button>
                </Link>
              </div>
            </div>
            <div className="related__photos pl-2 pb-2 w-32 opacity-70">
              <h1>Related_Stories</h1>
              <div className="add_photos-contents">
                <button
                  className="plus_btn bg-white text-black rounded pr-2 pl-2 "
                  onClick={() => {
                    setOpenModal(true);
                  }}
                >
                  +
                </button>
                <p>13,000 </p>
              </div>
              <div className="bg-white border rounded w-24 mt-3">
                <Link to="/funfact-detail">
                  <button className="btn bg-blue-500 shadow-lg shadow-blue-500/50 text-xs text-white">
                    More Stories..
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Countries;
