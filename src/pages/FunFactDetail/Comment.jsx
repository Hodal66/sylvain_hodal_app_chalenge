import React from "react";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

const Comment = ({ setOpenModal }) => {
  const openIt = () => {
    console.log("yes you hit");
    setOpenModal(true);
  };
  return (
    <div className="h-fit mt-8 p-5 bg-blue-500 w-full rounded-xl">
      <div className="flex justify-between  bg-blue-500 shadow-lg shadow-blue-500/50 text-xs text-white font-bold pb-3">
        <span className="font-serif">
          Niyonkuru Sylvain , <span className="text-blue-900">You</span>
        </span>
        <span className="font-serif">on 12/20/2022</span>
      </div>
      <div className="text-xl text-blue-200 font-serif">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi quidem
        exercitationem voluptas! Iste distinctio aspernatur necessitatibus
        inventore debitis fugit harum. Lorem ipsum dolor sit, amet consectetur
        adipisicing elit. Ipsa nam voluptatem quod modi? Accusantium facere
        molestias quo aut soluta! Officia, laborum. Iste aliquid nam quia
        nesciunt delectus beatae, modi tenetur?
      </div>
      <div className="flex justify-end text-sm">
        <div className="w-[20%] flex justify-evenly pt-3">
          <FiEdit
            className="w-[30px] h-[30px] cursor-pointer"
            onClick={openIt}
          />
          <MdDelete className="w-[30px] h-[30px] cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Comment;
