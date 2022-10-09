import React from "react";
import Header from "../../components/Header";
import HeaderImage from "../../images/header_baground1 1.png";
import "./allCountries.css";
import Countries from "../../components/Countries";
import countries from "../../data";

function AllCountries() {
  return (
    <div>
      <Header title="Our Trainers " image={HeaderImage}>
        Now Enjoy New world by exploring by searching your prefered country and
        exploring All country library you are welcome🏹🚀
      </Header>
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
