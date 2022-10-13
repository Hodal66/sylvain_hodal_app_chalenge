/* eslint-disable jsx-a11y/no-distracting-elements */
import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import "./allCountries.css";
import countries from "../../data";
import { gql, useQuery } from "@apollo/client";
import Pagination from "../../components/Pagination";
import Countries from "../../components/Country";
import NewModalComment from "../../components/FormsPackage/NewModalComment";
import NewModalPhoto from "../../components/FormsPackage/NewModalPhoto";

export const GET_ALL_COUNTRIES = gql`
  query GetAllCountries($page: Int!, $itemsPerPage: Int!, $all: Boolean) {
    getAllCountries(page: $page, itemsPerPage: $itemsPerPage, All: $all) {
      name
      native
      continent {
        name
      }
      _id
      comments {
        content
      }
    }
  }
`;

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
function AllCountries() {
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const [page, setPage] = useState(1);
  const { error, data, loading } = useQuery(GET_ALL_COUNTRIES, {
    variables: {
      page: page,
      itemsPerPage: itemsPerPage,
      All: false,
    },
  });
  console.log(data);
  function handleChange(event) {
    const { value } = event.target;
    const value1 = Number(value);
    setItemsPerPage(value1);
  }
  const [openModal, setOpenModal] = useState(false);

  console.log(data);
  const color = "yellow";
  return (
    <div className="all__country-container">
      <ClipLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      {loading ? (
        <div className="flex justify-center">Data is loading .....</div>
      ) : (
        <header className="Header_content flex  flex-col justify-center text-white  ">
          <div className="w-full m-64">
            <h1 className="text-4xl ">Welcome To All Countries Cite!!</h1>
            <p className="w-1/2 text-xl">
              <marquee width="100%">
                Now Enjoy New world by exploring by searching your prefered
                country and exploring All country library you are welcome🏹🚀
              </marquee>
            </p>
          </div>
        </header>
      )}
      <section className="flex ">
        {openModal && <NewModalComment setOpenModal={setOpenModal} />}
        {openModal && <NewModalPhoto setOpenModal={setOpenModal} />}

        <div className="search_container w-1/2 ">
          <input
            type="search"
            name="search"
            right__side-content
            id=""
            className="search w-1/5"
            placeholder="Search any country you want "
          />
          <input
            type="button"
            value="Search"
            className="searchbtn hover:bg-blue-500"
          />
        </div>
        <div className="w-[37%] flex justify-around mt-8 h-full">
          <label
            for="countries"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
          ></label>
          <select
            value={itemsPerPage}
            onChange={handleChange}
            name="favColor"
            id="countries"
            className="bg-white px-2 border border-gray-300 text-blue-900 text-sm rounded-lg focus:ring-blue-500
             focus:border-blue-500 block w-1/2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
              dark:focus:ring-blue-500 dark:focus:border-blue-500
              hover:bg-blue-900 
              "
          >
            <option selected>ItemsPerPage</option>
            <option value="5">5 items</option>
            <option value="10">10 items</option>
            <option value="20">20 items</option>
            <option value="30">30 items</option>
            <option value="50">50 items</option>
            <option value="true">All items</option>
          </select>
          <Pagination setPage={setPage} />
        </div>
      </section>
      <section className="countries">
        <div className="cantents_Cards-container">
          {data &&
            data.getAllCountries.map(
              ({ code, name, continent, native, emoji, _id, comments }) => {
                return (
                  <>
                    <Countries
                      key={code}
                      setOpenModal={setOpenModal}
                      name={name}
                      openModal={openModal}
                      continent={continent.name}
                      image={countries[5].image}
                      comments={comments}
                      _id={_id}
                      native={native}
                      emoji={emoji}
                    ></Countries>
                  </>
                );
              }
            )}
        </div>
      </section>

      <div className="w-full ml-10 flex justify-end bg-blue-900 pt-6">
        <div className="w-full mr-24 mb-10 flex justify-center bg-blue-900">
          <Pagination setPage={setPage} />
        </div>
      </div>
    </div>
  );
}

export default AllCountries;
