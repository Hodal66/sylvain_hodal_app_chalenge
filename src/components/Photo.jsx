import React from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
function Photo({ image, author, date, setOpenModal }) {
  return (
    <div className="bg-blue-900  rounded-lg border-white m-4 p-4 hover:bg-blue-700">
      <div className="image-container rounded-sm border  border-white">
        <img src={image} alt={author} />
      </div>
      <div className="content-container flex justify-between text-sm pt-2">
        <div className="author ">
          <p>
            Writen By : <span className="text-blue-300 ">{author}</span>{" "}
          </p>
          <p>
            Posted On :<span className="text-blue-300">{date}</span>
          </p>
        </div>
        <div className="flex mt-4 gap-4 text-xl ">
          <AiOutlineEdit
            onClick={() => {
              setOpenModal(true);
            }}
            className="cursor-pointer"
          />
          <AiTwotoneDelete className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default Photo;
