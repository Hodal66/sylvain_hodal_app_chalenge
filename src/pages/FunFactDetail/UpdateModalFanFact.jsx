import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { client } from "../..";
import RingLoader from "react-spinners/RingLoader";
import { GET_ONE_COUNTRY_FACTS } from "./CountryFanFactDetail";

const UPDATE_COMMENT = gql`
  mutation ($content: String!, $commentId: ID!) {
    updateComment(content: $content, comment_id: $commentId) {
      content
    }
  }
`;

const UpdateModalFunFact = ({
  setOpenModal,
  comment_id,
  country_id,
  content_to_update,
}) => {
  console.log(comment_id);
  const [content, setContent] = useState(content_to_update);
  let navigate = useNavigate();

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const [update_comment, { loading }] = useMutation(UPDATE_COMMENT, {
    variables: {
      content: content,
      commentId: comment_id,
      // datePosted: "2/2/2022",
    },
    onCompleted: async ({ updateComment }) => {
      console.log(updateComment);
      await client.refetchQueries({
        include: [GET_ONE_COUNTRY_FACTS],
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
    update_comment();
  };

  const color = "white";
  const override = {
    display: "inline",
    margin: "0 auto",
  };

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
              Update Funfact posted on the country.
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
              <div className="flex w-[45%] justify-between">
                <button
                  className="bg-blue-700 h-full py-1 px-5 rounded-md hover:bg-blue-400"
                  onClick={() => {
                    setOpenModal(false);
                    setContent("");
                  }}
                >
                  Back
                </button>
                <button
                  className="bg-blue-700 h-full py-1 px-5 rounded-md hover:bg-blue-400"
                  onClick={handleClick}
                  type="submit"
                >
                  {loading ? (
                    <span className="text-blue-900">Updating fun fact</span>
                  ) : (
                    <span>Update Fun Fact</span>
                  )}
                  <span>
                    <RingLoader
                      color={color}
                      loading={loading}
                      cssOverride={override}
                      size={30}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateModalFunFact;
