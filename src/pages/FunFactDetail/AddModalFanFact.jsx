import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { client } from "../..";
// import RingLoader from "react-spinners/RingLoader";
import { GET_ONE_COUNTRY_FACTS } from "./CountryFanFactDetail";
import { GET_ALL_COUNTRIES } from "../allcountriesPage/AllCountries";

const ADD_COMMENT = gql`
  mutation Mutation(
    $countryId: ID!
    $author: ID!
    $content: String!
    # $datePosted: String!
  ) {
    addComment(
      country_id: $countryId
      author: $author
      content: $content
      # date_posted: $datePosted
    ) {
      date_posted
      author
      content
      _id
    }
  }
`;

const AddModalFunFact = ({
  setOpenModal,
  country_id,
  user_id,
  isCardClicked,
}) => {
  const [content, setContent] = useState("");
  let navigate = useNavigate();

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const [add_comment, { loading }] = useMutation(ADD_COMMENT, {
    variables: {
      countryId: country_id,
      author: user_id,
      content: content,
      // datePosted: "2/2/2022",
    },
    onCompleted: async ({ addComment }) => {
     
      if (isCardClicked) {
          await client.refetchQueries({
            include: [GET_ALL_COUNTRIES],
          });
        navigate(`/allcountries`);
      } else {
         await client.refetchQueries({
           include: [GET_ONE_COUNTRY_FACTS],
         });
      navigate(`/funfact-detail/${country_id}`);

      }
      setOpenModal(false);
    },
    onError: (errors) => {
      console.log(errors);
      navigate("/");
    },
  });

  const handleClick = (event) => {
    event.preventDefault();
    if (!content) return;
    add_comment();
  };

  //  const color = "white";
  //  const override = {
  //    display: "inline",
  //    margin: "0 auto",
  //  };

  return (
    <div className="w-screen h-screen flex justify-center items-center absolute z-40 bg-black bg-opacity-50">
      <div className="w-1/2 h-1/3 rounded-md box-border">
        <form
          action="
        "
          className="h-full bg-blue-500 w-full rounded-lg flex flex-col justify-evenly m-0 p-0"
        >
          <div className="h-[50%] w-full px-3">
            <label htmlFor="" className="h-[25%] mb-5 font-bold">
              Add Fun Fact to the country
            </label>
            <textarea
              onChange={handleContentChange}
              value={content}
              name="funFact"
              id=""
              className="w-full text-sm text-gray-900 pl-2 h-[75%] rounded-md"
            ></textarea>
          </div>
          <div className="h-[20%] w-full px-3">
            <div className="flex w-full items-center h-full">
              <div className="flex w-[40%] justify-between">
                <button
                  className="h-full py-1 px-5 rounded-md bg-red-700 hover:bg-red-500"
                  onClick={() => {
                    setOpenModal(false);
                  }}
                >
                  Back
                </button>
                <button
                  className="bg-blue-900 h-full py-1 px-5 rounded-md hover:bg-blue-700"
                  onClick={handleClick}
                  type="submit"
                >
                  {loading ? (
                    <div className="flex w-full">
                      <span className="">Saving </span>
                      <span className="pl-2">
                        <svg
                          aria-hidden="true"
                          className="mr-1 w-5 h-5 inline-block text-gray-200 animate-spin dark:text-gray-600 fill-blue-700"
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
                      </span>
                    </div>
                  ) : (
                    <span>Add Fun Fact</span>
                  )}
                  {/* <span>
                    <RingLoader
                      color={color}
                      loading={loading}
                      cssOverride={override}
                      size={30}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  </span> */}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddModalFunFact;
