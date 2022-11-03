import React, { useState } from "react";
import Card from "../UI/Card";
import { MdAddPhotoAlternate } from "react-icons/md";
import { BiMessageRoundedAdd } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { AUTH_TOKEN } from "../constants";
import jwt_decode from "jwt-decode";

function Countries({
  name,
  image,
  continent,
  native,
  setOpenModal,
  setOpenModal2,
  _id,
  emoji,
  comments,
  images,
  captureDataOfTheSelectedCard,
}) {
  let navigate = useNavigate();
  const token = localStorage.getItem(AUTH_TOKEN);
   const userIdFetched = token && jwt_decode(localStorage.getItem(AUTH_TOKEN));

const handleOpenModelAndPassDataUp = () => {
    captureDataOfTheSelectedCard({ country_id:_id, user_id: userIdFetched.userId });
    setOpenModal(true);
  };

  const handleOpenModelAndPassDataUp2 = () => {
    captureDataOfTheSelectedCard({
      country_id: _id,
      user_id: userIdFetched.userId,
    });
    setOpenModal2(true);
  };
  return (
    <div>
      <Card className="country">
        <div className="container-container">
          <div className="country_image-container border-sh ">
              <img src={image} alt={name} />
            <div className="image__content">
              <div className="left__side-content pb-4">
                <div className="text-sm text-white">
                  {name} , {native}
                </div>
                <div>{continent}</div>
              </div>
              <div className="right__side-content">{emoji}</div>
            </div>
          </div>
          <div className="buttons_controls-container flex gap-1">
            <div className="related__photos pl-2 w-28 opacity-70 ">
              <h1 className="text-sx ">Related_Photos</h1>
              <div className="add_photos-contents ">
                {token && (
                  <button
                    className="plus_btn bg-white text-black  rounded pr-2 pl-2 "
                    onClick={handleOpenModelAndPassDataUp}
                  >
                    <MdAddPhotoAlternate />
                  </button>
                )}

                <p className="text-xs">{images.length}</p>
              </div>
              <div className="bg-white border rounded w-20 mt-3">
                {/* <Link to="/gallery"> */}
                <button
                  className="btn bg-blue-500 shadow-lg shadow-blue-500/50  text-white related_content"
                  onClick={() => {
                    navigate(`/gallery/${_id}`);
                    // /subject/36236423463427jhdsjhf/ywejkhjshjkhsdjkhf
                  }}
                >
                  More Photos..
                </button>
                {/* </Link> */}
              </div>
            </div>
            <div className="related__photos pl-2 pb-2 w-28 opacity-70">
              <h1>Related_Stories</h1>
              <div className="add_photos-contents">
                {token && (
                  <button
                    className="plus_btn bg-white text-black rounded pr-2 pl-2 "
                    onClick={handleOpenModelAndPassDataUp2}
                  >
                    <BiMessageRoundedAdd />
                  </button>
                )}
                <p className="text-xs"> {comments.length} </p>
              </div>
              <div className="bg-white border rounded w-20 mt-3">
                {/* <Link to="/funfact-detail"> */}
                <button
                  className="btn bg-blue-500 shadow-lg shadow-blue-500/50  text-white related_content"
                  onClick={() => {
                    navigate(`/funfact-detail/${_id}`);
                  }}
                >
                  More Stories..
                </button>
                {/* </Link> */}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Countries;
