import React from "react";
import { FaStepForward, FaStepBackward } from "react-icons/fa";
function Pagination({ setPage, itemsPerPage, page }) {
  const totalPage = Math.ceil(250 / itemsPerPage);
  return (
    <div className="border w-[80%] rounded-xl ml-10 ">
      <div className="  bg-white rounded-xl flex  justify-around p-1">
        <div
          className=" p-1 flex rounded-sm bg-white text-blue-500 cursor-pointer"
          onClick={() => {
            setPage((prev) => {
              if (prev === 1) {
                return prev;
              } else {
                return prev - 1;
              }
            });
          }}
        >
          <FaStepBackward className="mt-1 mr-1 " />
          <div>Prev</div>
        </div>
        {/* <div className="w-1 bg-blue-500"></div> */}
        <div className="text-slate-700">
          <span className="text-2xl text-blue-700 pr-3 font-extrabold"> {page}</span> out of <span className="text-2xl pl-3 font-extrabold text-blue-700">{totalPage}</span>
        </div>

        <div
          className="p-1 flex  rounded-sm bg-white text-blue-500 cursor-pointer"
          onClick={() => {
            setPage((prev) => {
              if (prev === totalPage) {
                return prev;
              } else {
                return prev + 1;
              }
            });
          }}
        >
          <div>Next</div>
          <FaStepForward className="mt-1 ml-1" />
        </div>
      </div>
    </div>
  );
}

export default Pagination;
