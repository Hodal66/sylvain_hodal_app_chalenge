import React, { useEffect, useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Header from "../../components/Header";
import HeaderImage from "../../images/header_baground1 1.png";
import "./allCountries.css";
import Countries from "../../components/Countries";
import countries from "../../data";

import { gql, useQuery } from "@apollo/client";

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
    const { error, data, loading } = useQuery(GET_ALL_COUNTRIES);
  
    console.log(data)
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
        <Header title="Our Trainers " image={HeaderImage}>
          Now Enjoy New world by exploring by searching your prefered country
          and exploring All country library you are welcome🏹🚀
        </Header>
      )}
      <section>
        <div className="search_container">
          <input
            type="search"
            name="search"
            right__side-content
            id=""
            className="search"
            placeholder="Search any country you want "
          />
          <input type="button" value="Search" className="searchbtn" />
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
                    name={name}
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
    </div>
  );
}

export default AllCountries;
