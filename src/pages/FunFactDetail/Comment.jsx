import React from "react";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { AUTH_TOKEN } from "../../constants";
import jwt_decode from "jwt-decode";

const Comment = ({ setOpenModal, comment }) => {
  const userIdFetched = jwt_decode(localStorage.getItem(AUTH_TOKEN));

  const openIt = () => {
    setOpenModal(true);
  };
  return (
    <div className="h-fit mt-8 p-5  w-full bg-blue-900  border shadow-inner">
      <div className="flex justify-between text-blue-200   font-bold pb-3">
        <span>
          {comment.author.firstName} {comment.author.secondName}
          {userIdFetched.userId === comment.author._id && (
            <span className="text-blue-500  italic "> , You</span>
          )}
        </span>
        <span>on 12/20/2022</span>
      </div>
      <div className="text-lg  text-blue-300">{comment.content}</div>
      <div className="flex justify-end text-sm">
        {userIdFetched.userId === comment.author._id && (
          <div className="w-[20%] flex justify-evenly pt-3">
            <FiEdit
              className="w-[20px] h-[20px] cursor-pointer"
              onClick={openIt}
            />
            <MdDelete className="w-[20px] h-[20px] cursor-pointer" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
