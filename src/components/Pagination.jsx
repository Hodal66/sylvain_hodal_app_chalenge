import React from "react";
import { FaStepForward, FaStepBackward } from "react-icons/fa";
function Pagination() {
  return (
    <div className="border w-1/2 rounded-xl ">
      <div className="  bg-white rounded-xl flex  justify-around p-1">
        <div className=" p-1 flex rounded-sm bg-white text-blue-500 ">
          <FaStepBackward className="mt-1 mr-1 " />
          <div>Prev</div>
        </div>
        <div className="w-1 bg-blue-500"></div>

        <div className="p-1 flex  rounded-sm bg-white text-blue-500 ">
          <div>Next</div>
          <FaStepForward className="mt-1 ml-1" />
        </div>
      </div>
    </div>
  );
}

export default Pagination;