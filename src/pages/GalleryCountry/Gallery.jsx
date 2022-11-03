/* eslint-disable jsx-a11y/no-distracting-elements */
import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import "./gallery.css";
import { galleryPhotoes } from "../../data";
import { useParams } from "react-router-dom";
import Photo from "../../components/Photo";
import { gql, useQuery } from "@apollo/client";
import { MdLocationPin } from "react-icons/md";
import NewModalGallery from "./NewModalGallery";
import EditModalGallery from "./EditModalGallery";
import jwt_decode from "jwt-decode";
import { AUTH_TOKEN } from "../../constants";

// export const GET_ALL_COUNTRIES = gql`
//   query {
//     getAllCountries {
//       # code
//       # name
//       # native
//       # phone
//       # currency
//       # emoji
//       # emojiU
//       # continent {
//       #   code
//       #   name
//       # }
//       # languages {
//       #   code
//       #   native
//       #   name
//       #   rtl
//       # }
//       # states {
//       #   code
//       #   name
//       # }
//       _id
//       name
//       images {
//         date_posted
//         image_url
//         _id
//         image_cloudinary_id
//         author {
//           email
//           firstName
//           secondName
//           _id
//         }
//       }
//     }
//   }
// `;

export const GET_ONE_COUNTRY_IMAGES = gql`
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
      images {
        date_posted
        image_url
        _id
        image_cloudinary_id
        createdAt
        updatedAt
        author {
          email
          firstName
          secondName
          _id
        }
      }
      _id
    }
  }
`;

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function Gallery() {
  // const userIdFetched = jwt_decode(localStorage.getItem(AUTH_TOKEN));
  const token = localStorage.getItem(AUTH_TOKEN);
  const userIdFetched = token && jwt_decode(localStorage.getItem(AUTH_TOKEN));
  let params = useParams();

  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);

   const { error, data, loading } = useQuery(GET_ONE_COUNTRY_IMAGES, {
     variables: {
       getOneCountryId: params.countryId,
     },
   });

  console.log(data);
  const color = "yellow";

  return (
    <div>
      {openModal && (
        <NewModalGallery
          user_id={userIdFetched.userId}
          setOpenModal={setOpenModal}
          country_id={params.countryId}
          isCardClicked={false}
        />
      )}
      <ClipLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      {loading ? (
        <div>Data is loading .....</div>
      ) : (
        <div className="backgroundImageContainer">
          <div className="flex justify-center">
            <div className="text-xl">
              <h1 className="text-6xl">
                Welcome to The {data && data.getOneCountry.name}'s gallery
              </h1>
              <marquee
                width="100%"
                className="bg-blue-900"
                scrolldelay="100"
                behavior="alternate"
              >
                <p className="ml-16">
                  {" "}
                  Now Enjoy New world by exploring by searching your prefered{" "}
                  <br />
                  country and exploring All country library you are welcome🏹🚀
                </p>
              </marquee>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-between mx-2 mr-10">
        <div className="">
          <h1 className="text-2xl flex ml-8">
            <MdLocationPin className=" ml-4 text-4xl" />
            <span className="text-blue-300 mx-4">Location:</span>
            {data && data.getOneCountry.name}
          </h1>
        </div>
        <h1 className="text-3xl">Gallery</h1>
       {userIdFetched && userIdFetched.userId ? ( <button
          className="bg-white text-blue-900 h-1/2 p-2 mt-8 ml-24 rounded-lg hover:bg-blue-900 hover:text-blue-100"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          Add Photo
        </button>): ("")}
      </div>
      <section className="Section-container">
        <section className="countries">
          {openModal2 && <EditModalGallery setOpenModal={setOpenModal2} />}
          <div className="cantents_Cards-container">
            {data &&
              data.getOneCountry.images.map((image, index) => {
                return (
                  <Photo
                    imageObject={image}
                    key={index}
                    setOpenModal={setOpenModal}
                    country_id={params.countryId}
                  />
                );
              })}
          </div>
        </section>
      </section>
    </div>
  );
}
export default Gallery;
