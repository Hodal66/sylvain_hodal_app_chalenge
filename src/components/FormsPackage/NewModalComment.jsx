import React, { useState } from "react";
const NewModalComment = ({ setOpenModal }) => {
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
        {/* <form
          action=""
          onSubmit={handleSubmit}
          className="w-full bg-blue-400 h-full"
        >
          <div className="flex flex-col h-full">
            <div>
              <label
                for="message"
                className="block text-sm font-medium text-gray-900 dark:text-gray-400"
              >
                Your comment
              </label>
              <textarea
                id="message"
                rows="6"
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
                Add Comment
              </button>
            </div>
          </div>
        </form> */}
        <form
          action="
        "
          className="h-full bg-blue-500 w-full rounded-lg flex flex-col justify-evenly m-0 p-0"
        >
          <div className="h-[50%] w-full px-3">
            <label htmlFor="" className="h-[25%] mb-5 font-bold">
              Add Fun Fact to this country
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
                  Add Comment
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewModalComment;
