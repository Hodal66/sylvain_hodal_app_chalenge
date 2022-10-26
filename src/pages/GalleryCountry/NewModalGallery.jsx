import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
// import BeatLoader from "react-spinners/BeatLoader";
// import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import RingLoader from "react-spinners/RingLoader";


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
  const color = "white";
  const override = {
    display: "inline",
    margin: "0 auto",
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
                  {isLoading ? (
                    <span className="text-blue-900">Saving a photo</span>
                  ) : (
                    <span>Add photo</span>
                  )}
                  <span>
                    <RingLoader
                      color={color}
                      loading={isLoading}
                      cssOverride={override}
                      size={30}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  </span>
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
