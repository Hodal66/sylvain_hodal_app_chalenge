import React from "react";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { AUTH_TOKEN } from "../../constants";
import jwt_decode from "jwt-decode";


const Comment = ({ setOpenModal, comment }) => {
     const userIdFetched = jwt_decode(localStorage.getItem(AUTH_TOKEN));

  const openIt = () => {
    console.log("yes you hit");
    setOpenModal(true);
  };
  return (
    <div className="h-fit mt-8 p-5 bg-regal-green w-full rounded-xl">
      <div className="flex justify-between text-blue-700 font-bold pb-3">
        <span>
          {comment.author.firstName} {comment.author.secondName}
          {userIdFetched.userId === comment.author._id && (<span> , You</span>)}
        </span>
        <span>on 12/20/2022</span>
      </div>
      <div className="text-xl">{comment.content}</div>
      <div className="flex justify-end text-sm">
        {userIdFetched.userId === comment.author._id && (
          <div className="w-[20%] flex justify-evenly pt-3">
            <FiEdit
              className="w-[30px] h-[30px] cursor-pointer"
              onClick={openIt}
            />
            <MdDelete className="w-[30px] h-[30px] cursor-pointer" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
