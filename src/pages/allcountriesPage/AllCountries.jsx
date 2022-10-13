import React, { useEffect, useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Header from "../../components/Header";
import HeaderImage from "../../images/header_baground1 1.png";
import "./allCountries.css";
import countries from "../../data";
import { gql, useQuery } from "@apollo/client";
import Pagination from "../../components/Pagination";
import Countries from "../../components/Country";
import NewModalComment from "../../components/FormsPackage/NewModalComment";
import NewModalPhoto from "../../components/FormsPackage/NewModalPhoto";

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
function AllCountries() {
  const { loading, error, data } = useQuery(GET_ALL_COUNTRIES);
  console.log(data);
  localStorage.setItem("data_come", JSON.stringify(data));
  const [openModal, setOpenModal] = useState(false);

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
        <div className="backGroungImage ">
          <div className="p-24 flex flex-col justify-center w-full px-48">
            <p className="text-4xl  py-4">Welcome to All Countries</p>
            <p className="text-xl ">
              Now Enjoy New world by exploring by searching your prefered
              country and exploring All country library you are welcome🏹🚀
            </p>
          </div>
        </div>
      )}
      <section className="flex ">
        {openModal && <NewModalComment setOpenModal={setOpenModal} />}
        {openModal && <NewModalPhoto setOpenModal={setOpenModal} />}

        <div className="search_container w-1/2">
          <input
            type="search"
            name="search"
            right__side-content
            id=""
            className="search hover:border-blue-400 hover:ring-offset-4 border border-blue-400"
            placeholder="Search any country you want "
          />
          <input type="button" value="Search" className="searchbtn" autoFocus />
        </div>
        <div className="w-1/2 flex justify-around mt-8 h-full">
          <Pagination />
        </div>
      </section>
      <section className="countries">
        <div className="cantents_Cards-container">
          {countries.map(
            ({ code, name, image, continent, country, city, emoji }) => {
              return (
                <>
                  <Countries
                    key={code}
                    setOpenModal={setOpenModal}
                    name={name}
                    openModal={openModal}
                    continent={continent}
                    image={image}
                    country={country}
                    city={city}
                    emoji={emoji}
                  ></Countries>
                </>
              );
            }
          )}
        </div>
      </section>

      <div className="w-full ml-10 flex justify-end bg-blue-800 pt-6">
        <div className="w-full mr-24 mb-10 flex justify-center bg-blue-800">
          <Pagination />
        </div>
      </div>
    </div>
  );
}

export default AllCountries;
