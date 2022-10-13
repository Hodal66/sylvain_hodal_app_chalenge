import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import "./gallery.css";
import { galleryPhotoes } from "../../data";
import Photo from "../../components/Photo";
import { gql, useQuery } from "@apollo/client";
import { MdLocationPin } from "react-icons/md";
export const GET_ALL_COUNTRIES = gql`
  query {
    getAllCountries {
      code
      name
      native
      phone
      currency
      emoji
      emojiU
      continent {
        code
        name
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
        author {
          email
          firstName
          secondName
          _id
        }
      }
      comments {
        author {
          email
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

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function Gallery() {
  const { data, loading } = useQuery(GET_ALL_COUNTRIES);

  console.log(data);
  const color = "yellow";

  return (
    <div>
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
              <h1 className="text-6xl">WelCome to This Gallery</h1>
              <p className="ml-16">
                {" "}
                Now Enjoy New world by exploring by searching your prefered{" "}
                <br />
                country and exploring All country library you are welcome🏹🚀
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-between mx-2 mr-10">
        <div className="">
          <h1 className="text-2xl flex">
            <MdLocationPin className=" ml-4 text-4xl" />
            <span className="text-blue-300"> Rwanda , Kigali</span>
          </h1>
        </div>
        <h1 className="">Gallery</h1>
        <button className="bg-white text-blue-900 h-1/2 p-2 mt-8 ml-24 rounded-lg">
          Add Photo
        </button>
      </div>
      <section className="Section-container">
        <section className="countries">
          <div className="cantents_Cards-container">
            {galleryPhotoes.map(({ id, author, image, date }) => {
              return (
                <>
                  <Photo
                    key={id}
                    author={author}
                    image={image}
                    date={date}
                  ></Photo>
                </>
              );
            })}
          </div>
        </section>
      </section>
    </div>
  );
}
export default Gallery;