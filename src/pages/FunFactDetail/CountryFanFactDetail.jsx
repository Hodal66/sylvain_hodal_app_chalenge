import React, { useState } from "react";
// import { ImageData } from "../database";
// import Image from "../data"
// import { FiEdit} from "react-icons/fi";
// import { MdDelete } from "react-icons/md";
import Comment from "./Comment";
import NewModalFunFact from "./NewModalFanFact";

const CountryFunFactDetail = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="w-full h-full grid grid-rows-12 grid-cols-12 overflow-y-scroll">
      {openModal && <NewModalFunFact setOpenModal={setOpenModal} />}
      <div className="row-start-1 row-end-2 bg-blue-300 col-span-full flex flex-col justify-center items-center">
        <div className="bg-red-500 text-3xl pb-8">
          You are welcome to this platForm
        </div>
        <div className="bg-blue-500 text-2xl">
          Now Enjoy New world by exploring by searching your prefered country
          and exploring All country library
        </div>
      </div>
      <div className="row-start-2 row-end-13 bg-pink-400 col-span-full flex justify-center">
        <div className="w-[80%]">
          <div className="flex justify-between items-center py-3 bg-red-200">
            <div className="text-xl">Country : Rwanda </div>
            <div className="text-3xl">Fun Fact </div>
            <div className="bg-white text-black px-4 py-2 rounded ">
              <button className="cursor-pointer">Add Fact</button>
            </div>
          </div>
          <div className="flex p-10 bg-green-400 w-full rounded-2xl justify-evenly">
            <div className="bg-red-100 p-4 rounded-md">
              <div className="text-3xl p-2 font-bold">Basic Information</div>
              <div className="text-2xl p-1">Country name: Rwanda</div>
              <div className="text-2xl p-1">City name: Kigali</div>
              <div className="text-2xl p-1">Currency: RWF</div>
            </div>
            <div className="bg-red-100 p-4 rounded-md">
              <div className="text-3xl p-2 font-bold">Basic Information</div>
              <div className="text-2xl p-1">Country name: Rwanda</div>
              <div className="text-2xl p-1">City name: Kigali</div>
              <div className="text-2xl p-1">Currency: RWF</div>
            </div>
          </div>
          <div>
            <div className="flex justify-center text-3xl pb-5 pt-8">
              <div>
                <span className="text-white font-black">10</span> FunFacts about
                Rwanda
              </div>
            </div>
            <div>
              <Comment setOpenModal={setOpenModal} />
              <Comment setOpenModal={setOpenModal} />
              <Comment setOpenModal={setOpenModal} />
              <Comment setOpenModal={setOpenModal} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryFunFactDetail;
