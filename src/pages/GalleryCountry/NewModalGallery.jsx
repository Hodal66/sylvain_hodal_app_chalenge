import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
// import BeatLoader from "react-spinners/BeatLoader";
// import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
// import RingLoader from "react-spinners/RingLoader";


import axios from "axios";
import { client } from "../..";
import { GET_ONE_COUNTRY_IMAGES } from "./Gallery";
import { GET_ALL_COUNTRIES } from "../allcountriesPage/AllCountries";
const UPLOAD_FILE = gql`
  mutation (
    $author: ID!
    # $datePosted: String!
    $imageUrl: String!
    $imageCloudinaryLocation: String!
    $countryId: ID!
  ) {
    addImage(
      author: $author
      # date_posted: $datePosted
      image_url: $imageUrl
      image_cloudinary_id: $imageCloudinaryLocation
      country_id: $countryId
    ) {
      image_cloudinary_id
      image_url
      date_posted
      author
      _id
    }
  }
`;

const NewModalGallery = ({ setOpenModal, country_id, user_id, isCardClicked }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fileState, setFileState] = useState("");
  let navigate = useNavigate();

  const [saveTheLinkToMongoDb, { loading }] = useMutation(UPLOAD_FILE, {
    onCompleted: async ({ addImage }) => {
     if (isCardClicked) {
        await client.refetchQueries({
          include: [GET_ALL_COUNTRIES],
        });
        navigate(`/allcountries`);
        ;
     } else {
       await client.refetchQueries({
         include: [GET_ONE_COUNTRY_IMAGES],
       });
       navigate(`/gallery/${country_id}`);
     }
      setOpenModal(false);
    },
    onError: (errors) => {
      console.log(errors);
      navigate("/");
    },
  });

  const onFileChange = (e) => {
    setFileState(e.target.files[0]);
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    // create new form data to ressemble the normal form where it should be form/data
    const formData = new FormData();
    formData.append("file_name", fileState);

    // initiate loading spinner through setting the isLoading to true
    setIsLoading(true);

    // then save the image in the backend where the multer and cloudinary package handles it and save it to the cloudinary database
    // after being hosted on cloudinary, the cloudinary returns the "URL link" and the "UNIQUE id" to that image where it hosted
    const result = await axios.post(
      "http://localhost:2000/image-upload",
      formData
    );
    // then after getting the link to the image from the cloudinary, go on and save that inside mongo db along with its cloudinary_id
    await saveTheLinkToMongoDb({
      variables: {
        author: user_id,
        // datePosted: "2/2/2022",
        imageUrl: result.data.url,
        imageCloudinaryLocation: result.data.filename,
        countryId: country_id,
      },
    });
    // destroy loading spinner through setting the isLoading to false
    setIsLoading(false);
    console.log(result);
  };
  // const color = "white";
  // const override = {
  //   display: "inline",
  //   margin: "0 auto",
  // };

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
                <button
                  className="h-full py-1 px-5 rounded-md bg-red-700 hover:bg-red-500"
                  type="submit"
                  onClick={() => {
                    setOpenModal(false);
                  }}
                >
                  Back
                </button>
                <button
                  className="bg-blue-900 h-full py-1 px-5 rounded-md hover:bg-blue-700"
                  onClick={onSubmit}
                  type="submit"
                >
                  {isLoading ? (
                    <div className="flex w-full">
                      <span className="">Saving </span>
                      <span className="pl-2">
                        <svg
                          aria-hidden="true"
                          className="mr-1 w-5 h-5 inline-block text-gray-200 animate-spin dark:text-gray-600 fill-blue-700"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                      </span>
                    </div>
                  ) : (
                    <span>Add photo</span>
                  )}
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
