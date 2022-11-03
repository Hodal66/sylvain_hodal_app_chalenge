import React, { useState } from "react";
import { useParams } from "react-router-dom";
import AddModalFunFact from "./AddModalFanFact";
import Comment from "./Comment";
import { gql, useQuery } from "@apollo/client";
import jwt_decode from "jwt-decode";
import { GoLocation } from "react-icons/go";
import { AUTH_TOKEN } from "../../constants";
import "../../App.css";
import UpdateModalFunFact from "./UpdateModalFanFact";

export const GET_ONE_COUNTRY_FACTS = gql`
  query GetOneCountry($getOneCountryId: ID!) {
    getOneCountry(id: $getOneCountryId) {
      code
      name
      native
      phone
      currency
      emoji
      emojiU
      continent {
        name
        code
      }
      languages {
        code
        native
        name
        rtl
      }
      states {
        code
        name
      }
      comments {
        author {
          email
          password
          firstName
          secondName
          _id
        }
        date_posted
        content
        _id
        updatedAt
        createdAt
      }
      _id
    }
  }
`;

const CountryFunFactDetail = () => {
  // UpdateModalFunFact
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [commentId, setCommentId] = useState("");
  const [commentToUpdate, setCommentToUpdate] = useState("");

  const getMeTheIdFromSelectedComment = (data) => {
    setCommentId(data.id);
    setCommentToUpdate(data.comment);
  }
  let params = useParams();
  const { error, data, loading } = useQuery(GET_ONE_COUNTRY_FACTS, {
    variables: {
      getOneCountryId: params.countryId,
    },
  });
 const token = localStorage.getItem(AUTH_TOKEN);
 const userIdFetched = token && jwt_decode(localStorage.getItem(AUTH_TOKEN));

  return (
    <div className="w-full h-full grid grid-rows-12 grid-cols-12 overflow-y-scroll backgroung_Comment_image">
      {openModal && (
        <UpdateModalFunFact
          setOpenModal={setOpenModal}
          comment_id={commentId}
          country_id={params.countryId}
          content_to_update={commentToUpdate}
        />
      )}
      <div className="row-start-1 row-end-2 col-span-full flex flex-col justify-center items-center background__image">
        <div className="text-4xl pb-8">
          You are welcome to the {data && data.getOneCountry.name}'s Fun Facts
        </div>
        <div className="text-2xl w-1/2">
          <marquee behavior="alternate">
            Now Enjoy New world by exploring by searching your prefered country
            and exploring All country library
          </marquee>
        </div>
      </div>
      <div className="row-start-2 row-end-13  col-span-full flex justify-center">
        {openModal2 && (
          <AddModalFunFact
            setOpenModal={setOpenModal2}
            country_id={params.countryId}
            user_id={userIdFetched.userId}
            isCardClicked={false}
          />
        )}
        <div className="w-[80%] pt-8">
          <div className="flex justify-between items-center py-3">
            <div className="text-xl flex gap-5">
              <GoLocation className="text-4xl" />{" "}
              <span className="text-blue-900 font-bold text-1xl">
                Country :
              </span>
              {data && data.getOneCountry.name}
            </div>
            <div className="text-3xl">Fun Fact </div>
           {userIdFetched && userIdFetched.userId ? ( <div className="bg-white text-black px-4 py-2 mt-2 rounded hover:bg-blue-900 hover:text-white">
              <button
                className="cursor-pointer"
                onClick={() => {
                  setOpenModal2(true);
                }}
              >
                Add Fact
              </button>
            </div>): ""}
          </div>
          <div className="flex p-10  w-full rounded-2xl justify-evenly">
            <div className="bg-blue-200 p-4 rounded-md text-black">
              <div className="text-3xl p-2 font-bold">Basic Information</div>
              <div className="text-2xl p-1">
                <span className=""> Country name:</span>{" "}
                {data && data.getOneCountry.name}
              </div>
              <div className="text-2xl p-1">
                Code: {data && data.getOneCountry.code}
              </div>
              <div className="text-2xl p-1">
                Currency: {data && data.getOneCountry.currency}
              </div>
            </div>
            <div className="bg-blue-200 p-4 rounded-md text-black">
              <div className="text-3xl p-2 font-bold">
                All accepted language
              </div>
              {data &&
                data.getOneCountry.languages.map((lang) => (
                  <div className="text-2xl p-1">{lang.name}</div>
                ))}
            </div>
          </div>
          <div>
            <div className="flex justify-center text-3xl pb-5 pt-8">
              <marquee behavior="alternate">
                <div className="flex gap-5">
                  <span className="text-white font-black rounded-sm w-10 flex justify-center bg-blue-900 ">
                    {data && data.getOneCountry.comments.length}
                  </span>
                  FunFacts about {data && data.getOneCountry.name}
                </div>
              </marquee>
            </div>
            <div>
              {data &&
                data.getOneCountry.comments.map((comment, index) => {
                  return (
                    <Comment
                      comment={comment}
                      country_id={params.countryId}
                      key={index}
                      getMeTheIdFromSelectedComment={
                        getMeTheIdFromSelectedComment
                      }
                      setOpenModal={setOpenModal}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryFunFactDetail;
