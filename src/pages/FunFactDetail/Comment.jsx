import React from "react";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { AUTH_TOKEN } from "../../constants";
import RingLoader from "react-spinners/RingLoader";

import { gql, useMutation } from "@apollo/client";

import jwt_decode from "jwt-decode";
import { client } from "../..";
import { GET_ONE_COUNTRY_FACTS } from "./CountryFanFactDetail";
import { useNavigate } from "react-router-dom";

export const DELETE_ONE_COMMENT = gql`
  mutation ($commentId: ID!) {
    deleteComment(comment_id: $commentId)
  }
`;

const Comment = ({
  setOpenModal,
  comment,
  country_id,
  getMeTheIdFromSelectedComment,
}) => {
  // const date_readable = comment.date_posted.toString();
  let navigate = useNavigate();

  // console.log(date_readable);
  // const date_arr = date_readable.split("GMT");

  // const date = date_arr[0];
  const userIdFetched = jwt_decode(localStorage.getItem(AUTH_TOKEN));
// const dates = new Date(date);
// console.log(dates.toString())
  const [delete_comment, { loading }] = useMutation(DELETE_ONE_COMMENT, {
    variables: {
      commentId: comment._id,
    },
    onCompleted: async ({ deleteImage }) => {
      console.log(deleteImage);
      await client.refetchQueries({
        include: [GET_ONE_COUNTRY_FACTS],
      });
      navigate(`/funfact-detail/${country_id}`);
    },
    onError: (errors) => {
      console.log(errors);
      navigate("/");
    },
  });

  const deleteCommentHandler = async () => {
    await delete_comment();
  };

  const handleEditingComment = () => {
    getMeTheIdFromSelectedComment({id:comment._id, comment: comment.content});
    setOpenModal(true);
  }
  // const openIt = () => {
  //   setOpenModal(true);
  // };
  const color = "red";
  const override = {
    display: "inline",
    margin: "0 auto",
  };

  return (
    <div className="h-fit mt-8 p-5  w-full bg-blue-900  border shadow-inner">
      <div className="flex justify-between text-blue-200   font-bold pb-3">
        <span>
          {comment.author.firstName.charAt(0).toUpperCase() +
            comment.author.firstName.slice(1)}{" "}
          {comment.author.secondName.charAt(0).toUpperCase() +
            comment.author.secondName.slice(1)}
          {userIdFetched.userId === comment.author._id && (
            <span className="text-blue-500  italic "> , You</span>
          )}
        </span>
        <span>
          {/* posted on{comment.date_posted} */}
          posted on: {new Date(Number(comment.date_posted)).toLocaleString()}
        </span>
        {comment.updatedAt && (
          <div>
            recently updated on:{" "}
            {new Date(Number(comment.updatedAt)).toLocaleString()}
          </div>
        )}
      </div>
      <div className="text-lg  text-blue-300">{comment.content}</div>
      <div className="flex justify-end text-sm">
        {userIdFetched.userId === comment.author._id && (
          <div className="w-[20%] flex justify-evenly pt-3">
            <FiEdit
              className="w-[20px] h-[20px] cursor-pointer hover:text-blue-500"
              onClick={handleEditingComment}
            />
            {!loading && (
              <MdDelete
                className="w-[20px] h-[20px] cursor-pointer hover:text-red-800"
                onClick={deleteCommentHandler}
              />
            )}
            <RingLoader
              color={color}
              loading={loading}
              cssOverride={override}
              size={30}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
