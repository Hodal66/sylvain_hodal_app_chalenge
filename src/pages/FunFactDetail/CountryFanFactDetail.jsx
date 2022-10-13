import React, { useState } from "react";
import { useParams } from "react-router-dom";
import AddModalFunFact from "./AddModalFanFact";
import Comment from "./Comment";
import NewModalFunFact from "./NewModalFanFact";
import { gql, useQuery } from "@apollo/client";



export const GET_ONE_COUNTRY = gql`
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
      }
      _id
    }
  }
`;

const CountryFunFactDetail = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  let params = useParams();
  // console.log(params);
    const { error, data, loading } = useQuery(GET_ONE_COUNTRY, {
      variables: {
        getOneCountryId: params.countryId,
      },
    });
  return (
    <div className="w-full h-full grid grid-rows-12 grid-cols-12 overflow-y-scroll">
      {openModal && <NewModalFunFact setOpenModal={setOpenModal} />}
      <div className="row-start-1 row-end-2 bg-regal-green col-span-full flex flex-col justify-center items-center">
        <div className="text-3xl pb-8">You are welcome to this platForm</div>
        <div className="text-2xl">
          Now Enjoy New world by exploring by searching your prefered country
          and exploring All country library
        </div>
      </div>
      <div className="row-start-2 row-end-13 bg-blue-900 col-span-full flex justify-center">
        {openModal2 && <AddModalFunFact setOpenModal={setOpenModal2} />}
        <div className="w-[80%]">
          <div className="flex justify-between items-center py-3">
            <div className="text-xl">
              Country : {data && data.getOneCountry.name}
            </div>
            <div className="text-3xl">Fun Fact </div>
            <div className="bg-white text-black px-4 py-2 rounded ">
              <button
                className="cursor-pointer"
                onClick={() => {
                  setOpenModal2(true);
                }}
              >
                Add Fact
              </button>
            </div>
          </div>
          <div className="flex p-10 bg-blue-900 w-full rounded-2xl justify-evenly">
            <div className="bg-white p-4 rounded-md text-black">
              <div className="text-3xl p-2 font-bold">Basic Information</div>
              <div className="text-2xl p-1">
                Country name: {data && data.getOneCountry.name}
              </div>
              <div className="text-2xl p-1">
                Code: {data && data.getOneCountry.code}
              </div>
              <div className="text-2xl p-1">
                Currency: {data && data.getOneCountry.currency}
              </div>
            </div>
            <div className="bg-white p-4 rounded-md text-black">
              <div className="text-3xl p-2 font-bold">
                All accepted language
              </div>
              {data &&
                data.getOneCountry.languages.map((lang) => (
                  <div className="text-2xl p-1">{lang.name}</div>
                ))}
              {/* <div className="text-2xl p-1">Kinyarwanda</div>
              <div className="text-2xl p-1">Kiswahili</div>
              <div className="text-2xl p-1">French</div> */}
            </div>
          </div>
          <div>
            <div className="flex justify-center text-3xl pb-5 pt-8">
              <div>
                <span className="text-white font-black">
                  {data && data.getOneCountry.comments.length}
                </span>
                FunFacts about {data && data.getOneCountry.name}
              </div>
            </div>
            <div>
              {data &&
                data.getOneCountry.comments.map((comment, index) => {
                  return (
                    <Comment
                      comment={comment}
                      key={index}
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
