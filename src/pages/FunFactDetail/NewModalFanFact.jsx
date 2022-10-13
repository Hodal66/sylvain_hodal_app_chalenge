import React, { useState } from "react";
const NewModalFunFact = ({ setOpenModal }) => {
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
    <div className="w-screen h-screen flex justify-center items-center absolute bg-black bg-opacity-50">
      <div className="w-1/2 h-1/3 bg-red-800 rounded-md box-border">
        <div className="font-bold border-b-2 border-solid border-darkBluePhant w-[130px]">
          Create Operator
        </div>
        <form action="" onSubmit={handleSubmit} className="w-full bg-green-400">
          <div className="flex flex-col">
            <label
              for="message"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Your message
            </label>
            <textarea
              id="message"
              rows="4"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your message..."
            ></textarea>
          </div>
          <div className="flex">
            <div className="bg-[#19B600] rounded-md pt-1 cursor-pointer">
              <button
                onClick={() => {
                  setOpenModal(false);
                }}
              >
                Back
              </button>
            </div>
            <button
              type="submit"
              className="bg-darkBluePhant rounded-md cursor-pointer"
            >
              Save Operator
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewModalFunFact;
