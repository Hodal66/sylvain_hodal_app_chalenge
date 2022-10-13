import React, { useState } from "react";
const EditModalGallery = ({ setOpenModal }) => {
  const [formData, setFormData] = useState(true);

  const handleChange = (event) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center absolute z-40 bg-black bg-opacity-50">
      <div className="w-1/2 h-1/3 rounded-md box-border">
        <form
          action="
        "
          className="h-full bg-blue-500 w-full rounded-lg flex flex-col justify-evenly m-0 p-0"
        >
          <div className="h-[50%] w-full px-3">
            <label htmlFor="" className="h-[25%] mb-5 font-bold">
              Edit Photo
            </label>
            <textarea
              name=""
              id=""
              className="w-full text-sm text-gray-900 pl-2 h-[75%] rounded-md"
            ></textarea>
          </div>
          <div className="h-[20%] w-full px-3">
            <div className="flex w-full items-center h-full">
              <div className="flex w-[40%] justify-between">
                <button
                  className="bg-regal-green h-full py-1 px-5 rounded-md hover:bg-green-400"
                  onClick={() => {
                    setOpenModal(false);
                  }}
                >
                  Back
                </button>
                <button className="bg-regal-green h-full py-1 px-5 rounded-md hover:bg-green-400">
                  Update photo
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModalGallery;
