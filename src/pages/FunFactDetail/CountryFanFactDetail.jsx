import React, { useState } from "react";
import AddModalFunFact from "./AddModalFanFact";
import Comment from "./Comment";
import NewModalFunFact from "./NewModalFanFact";

const CountryFunFactDetail = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  return (
    <div className="w-full h-full grid grid-rows-12 grid-cols-12 overflow-y-scroll">
      {openModal && <NewModalFunFact setOpenModal={setOpenModal} />}
      <div className="row-start-1 row-end-2 bg-regal-green col-span-full flex flex-col justify-center items-center">
        <div className="text-3xl pb-8">You are welcome to this platForm</div>
        <div className="text-2xl">
          Now Enjoy New world by exploring by searching your prefered country
          and exploring All country library
        </div>
      </div>
      <div className="row-start-2 row-end-13 bg-blue-900 col-span-full flex justify-center">
        {openModal2 && <AddModalFunFact setOpenModal={setOpenModal2} />}
        <div className="w-[80%]">
          <div className="flex justify-between items-center py-3">
            <div className="text-xl">Country : Rwanda </div>
            <div className="text-3xl">Fun Fact </div>
            <div className="bg-white text-black px-4 py-2 rounded ">
              <button
                className="cursor-pointer"
                onClick={() => {
                  setOpenModal2(true);
                }}
              >
                Add Fact
              </button>
            </div>
          </div>
          <div className="flex p-10 bg-blue-900 w-full rounded-2xl justify-evenly">
            <div className="bg-white p-4 rounded-md text-black">
              <div className="text-3xl p-2 font-bold">Basic Information</div>
              <div className="text-2xl p-1">Country name: Rwanda</div>
              <div className="text-2xl p-1">City name: Kigali</div>
              <div className="text-2xl p-1">Currency: RWF</div>
            </div>
            <div className="bg-white p-4 rounded-md text-black">
              <div className="text-3xl p-2 font-bold">
                All accepted language
              </div>
              <div className="text-2xl p-1">Kinyarwanda</div>
              <div className="text-2xl p-1">Kiswahili</div>
              <div className="text-2xl p-1">French</div>
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
