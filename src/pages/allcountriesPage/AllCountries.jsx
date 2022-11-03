import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import "./allCountries.css";
import countries from "../../data";
import { gql, useQuery } from "@apollo/client";
import Pagination from "../../components/Pagination";
import Countries from "../../components/Country";
// import NewModalComment from "../../components/FormsPackage/NewModalComment";
// import NewModalPhoto from "../../components/FormsPackage/NewModalPhoto";
import NewModalGallery from "../GalleryCountry/NewModalGallery";
import AddModalFunFact from "../FunFactDetail/AddModalFanFact";
import { client } from "../..";

export const GET_ALL_COUNTRIES = gql`
  query GetAllCountries(
    $page: Int!
    $itemsPerPage: Int!
    $all: Boolean
    $selection: String
    $filterData: String
  ) {
    getAllCountries(
      page: $page
      itemsPerPage: $itemsPerPage
      All: $all
      selection: $selection
      filterData: $filterData
    ) {
      name
      native
      continent {
        name
      }
      _id
      comments {
        content
      }
      images {
        image_url
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
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [search, setSearch ] = useState(null);
  const [page, setPage] = useState(1);
  const [allData, setAllData] = useState(false);
  const { error, data, loading } = useQuery(GET_ALL_COUNTRIES, {
    variables: {
      filterData: search,
      selection: search,
      page: page,
      itemsPerPage: itemsPerPage,
      all: allData,
    },
    onCompleted: async () => {
      await client.refetchQueries({
        include: [GET_ALL_COUNTRIES],
      });
    },
  });
  const [countryId, setCountryId] = useState("");
  const [userId, setUserId] = useState("");
  const captureDataOfTheSelectedCard = (dataCaptured) => {
    console.log(dataCaptured);
    setCountryId(dataCaptured.country_id);
    setUserId(dataCaptured.user_id);
  };

  const handleFilteringEvent = (event) => {
      const filterString = event.target.value;
      setSearch(filterString);
  }
  
  const handleChange = (event) => {
    const { value } = event.target;
    const value1 = Number(value);
    if (value1 === 250) {
    
      setAllData(true);
    }
    setItemsPerPage(value1);
  };

  const [openModal2, setOpenModal2] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const color = "yellow";
  return (
    <div className="all__country-container">
      {!search && (
        <ClipLoader
          color={color}
          loading={loading}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
      {loading ? (
        !search ? (
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
        )
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
        {openModal2 && (
          <AddModalFunFact
            setOpenModal={setOpenModal2}
            country_id={countryId}
            user_id={userId}
            isCardClicked={true}
          />
        )}
        {openModal && (
          <NewModalGallery
            setOpenModal={setOpenModal}
            country_id={countryId}
            user_id={userId}
            isCardClicked={true}
          />
        )}

        <div className="search_container w-1/2 ">
          <input
            type="search"
            name="search"
            value={!search ? "" : search}
            onChange={handleFilteringEvent}
            className="search w-1/5 mr-3 pr-4"
            placeholder="Search by any country name you want "
          />
          {loading ? (
            <svg
              aria-hidden="true"
              className="mr-6 w-7 h-7 inline-block text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          ) : (
            <button className="searchbtn">
              {" "}
              <span>Country</span>
            </button>
          )}
        </div>
        <div className="w-[37%] flex justify-around mt-8 h-full">
          <label
            htmlFor="countries"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
          ></label>
          <select
            value={itemsPerPage}
            onChange={handleChange}
            name="favColor"
            id="countries"
            className="bg-white px-2 border border-gray-300 text-blue-900 text-sm rounded-lg focus:ring-blue-500
             focus:border-blue-500 block w-1/2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
              dark:focus:ring-blue-500 dark:focus:border-blue-500 hover:text-white hover:bg-blue-900 
              "
          >
            <option value ="3">3 Items Per Page</option>
            <option value="5">5 items</option>
            <option value="10">10 items</option>
            <option value="20">20 items</option>
            <option value="30">30 items</option>
            <option value="50">50 items</option>
            <option value="250">All items</option>
          </select>
          <Pagination
            setPage={setPage}
            itemsPerPage={itemsPerPage}
            page={page}
          />
        </div>
      </section>
      <section className="countries">
        <div className="cantents_Cards-container">
          {data &&
            data.getAllCountries.map(
              ({
                code,
                name,
                continent,
                native,
                emoji,
                _id,
                comments,
                images,
              }) => {
                return (
                  <>
                    <Countries
                      key={code}
                      setOpenModal={setOpenModal}
                      setOpenModal2={setOpenModal2}
                      name={name}
                      openModal={openModal}
                      continent={continent.name}
                      image={countries[5].image}
                      comments={comments}
                      images={images}
                      captureDataOfTheSelectedCard={
                        captureDataOfTheSelectedCard
                      }
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
          <Pagination
            setPage={setPage}
            itemsPerPage={itemsPerPage}
            page={page}
          />
        </div>
      </div>
    </div>
  );
}

export default AllCountries;
