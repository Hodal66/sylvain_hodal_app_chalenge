import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { client } from "../..";
import { GET_ONE_COUNTRY } from "./CountryFanFactDetail";

const ADD_COMMENT = gql`
  mutation Mutation(
    $countryId: ID!
    $author: ID!
    $content: String!
    $datePosted: String!
  ) {
    addComment(
      country_id: $countryId
      author: $author
      content: $content
      date_posted: $datePosted
    ) {
      date_posted
      author
      content
      _id
    }
  }
`;

const AddModalFunFact = ({ setOpenModal, country_id, user_id, setNewData }) => {
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
      datePosted: "2/2/2022",
    },
    onCompleted: async ({ addComment }) => {
      await client.refetchQueries({
        include: [GET_ONE_COUNTRY],
      });
      navigate(`/funfact-detail/${country_id}`);
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

  return (
    <div className="w-screen h-screen flex justify-center items-center absolute bg-black bg-opacity-50">
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
                  className="bg-blue-700 h-full py-1 px-5 rounded-md hover:bg-blue-400"
                  onClick={() => {
                    setOpenModal(false);
                  }}
                >
                  Back
                </button>
                <button
                  className="bg-blue-700 h-full py-1 px-5 rounded-md hover:bg-blue-400"
                  onClick={handleClick}
                  type="submit"
                >
                  Add Fun Fact
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
