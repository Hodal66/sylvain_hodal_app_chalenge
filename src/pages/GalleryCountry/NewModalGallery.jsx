import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import axios from "axios";
const UPLOAD_FILE = gql`
  mutation (
    $author: ID!
    $datePosted: String!
    $imageUrl: String!
    $imageCloudinaryLocation: String!
    $countryId: ID!
  ) {
    addImage(
      author: $author
      date_posted: $datePosted
      image_url: $imageUrl
      image_cloudinary_location: $imageCloudinaryLocation
      country_id: $countryId
    ) {
      image_cloudinary_location
      image_url
      date_posted
      author
      _id
    }
  }
`;

const NewModalGallery = ({ setOpenModal }) => {
  const [fileState, setFileState] = useState("");

  const [saveTheLinkToMongoDb] = useMutation(UPLOAD_FILE, {
    onCompleted: ({ data }) => {
      console.log(data);
    },
  });

  // const [loading, setLoading] = useState(false);
  const onFileChange = (e) => {
    setFileState(e.target.files[0]);
  };
  const onSubmit = async (e) => {
    // content = multi-data/formdata
    e.preventDefault();
    const formData = new FormData(); //the important one
    formData.append("file_name", fileState);
    const result = await axios.post("http://localhost:2000/image-upload",formData);
    console.log("hello there");
    console.log(result);
    // await saveTheLinkToMongoDb({
    //   variables: {
    //      author,
    //   date_posted,
    //   image_url: 
    //   image_cloudinary_location,
    //   country_id
    //   }
    // })
    setOpenModal(false);
    // setLoading(true);
    console.log(result);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center absolute z-40 bg-black bg-opacity-50">
      <div className="w-1/2 h-1/3 rounded-md box-border">
        <form
          enctype="multipart/form-data"
          action="
        "
          className="h-full bg-blue-500 w-full rounded-lg flex flex-col justify-evenly m-0 p-0"
        >
          <div className="h-[50%] w-full px-3">
            <label htmlFor="" className="h-[25%] mb-5 font-bold">
              Add Photo to this country
            </label>
            <input
              onChange={onFileChange}
              type="file"
              required
              className="w-full text-sm text-gray-900 pl-2 h-[75%] rounded-md"
            ></input>
          </div>
          <div className="h-[20%] w-full px-3">
            <div className="flex w-full items-center h-full">
              <div className="flex w-[40%] justify-between">
                {/* {loading ? (
                  <div className="w-full text-sm text-gray-900 bg-red-400">
                    DATA IS LOADING ...
                  </div>
                ) : (
                  ""
                )} */}
                <button
                  className="bg-regal-green h-full py-1 px-5 rounded-md hover:bg-green-400"
                  type="submit"
                  onClick={() => {
                    setOpenModal(false);
                  }}
                >
                  Back
                </button>
                <button
                  className="bg-regal-green h-full py-1 px-5 rounded-md hover:bg-green-400"
                  onClick={onSubmit}
                  type="submit"
                >
                  Add photo
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewModalGallery;
