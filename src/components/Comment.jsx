import React from 'react'
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

const Comment = ({ setOpenModal}) => {
    const openIt = () => {
        console.log("yes you hit")
        setOpenModal(true);
    }
  return (
    <div className="h-fit mt-8 p-5 bg-regal-green w-full rounded-xl">
      <div className="flex justify-between text-blue-700 font-bold pb-3">
        <span>
          Niyonkuru Sylvain , <span>You</span>
        </span>
        <span>on 12/20/2022</span>
      </div>
      <div className="text-xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi quidem
        exercitationem voluptas! Iste distinctio aspernatur necessitatibus
        inventore debitis fugit harum. Lorem ipsum dolor sit, amet consectetur
        adipisicing elit. Ipsa nam voluptatem quod modi? Accusantium facere
        molestias quo aut soluta! Officia, laborum. Iste aliquid nam quia
        nesciunt delectus beatae, modi tenetur?
      </div>
      <div className="flex justify-end text-sm">
        <div className="w-[20%] flex justify-evenly pt-3">
          <FiEdit className="w-[30px] h-[30px]" onClick={openIt}/>
          <MdDelete className="w-[30px] h-[30px]" />
        </div>
      </div>
    </div>
  );
};

export default Comment
