import React, { useState } from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import axios from "axios";
import { gql, useMutation } from "@apollo/client";
import RingLoader from "react-spinners/RingLoader";
import jwt_decode from "jwt-decode";


import { client } from "..";
import { GET_ONE_COUNTRY_IMAGES } from "../pages/GalleryCountry/Gallery";
import { useNavigate } from "react-router-dom";
import { AUTH_TOKEN } from "../constants";

export const DELETE_ONE_IMAGE = gql`
  mutation ($imageId: ID!) {
    deleteImage(imageId: $imageId)
  }
`;

function Photo({ imageObject, country_id }) {
  // const userIdFetched = jwt_decode(localStorage.getItem(AUTH_TOKEN));
  const token = localStorage.getItem(AUTH_TOKEN);
   const userIdFetched = token && jwt_decode(localStorage.getItem(AUTH_TOKEN));


let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

const color = "red";
const override = {
  display: "inline",
  margin: "0 auto",
};
 
  const [delete_image, { loading }] = useMutation(DELETE_ONE_IMAGE, {
    variables: {
      imageId: imageObject._id,
    },
    onCompleted: async ({ deleteImage }) => {
      console.log(deleteImage)
      await client.refetchQueries({
        include: [GET_ONE_COUNTRY_IMAGES],
      });
      navigate(`/gallery/${country_id}`);
    },
    onError: (errors) => {
      console.log(errors);
      navigate("/");
    },
  });

  
 const deleteImageHandler = async () => {
   // set loading screen on while deleting
   setIsLoading(true);
   const result = await axios.post("http://localhost:2000/delete_image", {
     filename: imageObject.image_cloudinary_id,
   });
   console.log(result);
   if (result.data.status) {
     await delete_image();
   }
   // remove loading screen after deleting
   setIsLoading(false);
 }
  return (
    <div className="bg-blue-900  rounded-lg border-white m-4 p-4 hover:bg-blue-700">
      <div className="image-container rounded-sm border  border-white">
        <img src={imageObject.image_url} alt={imageObject.author.firstName} />
      </div>
      <div className="content-container flex justify-between text-sm pt-2">
        <div className="author ">
          <p>
            Writen By :{" "}
            <span className="text-blue-300 ">
              {/* this charAt and slice is used to capitalise each letter of the name when it was in caps or not. */}
              {imageObject.author.firstName.charAt(0).toUpperCase() +
                imageObject.author.firstName.slice(1)}{" "}
              {imageObject.author.secondName.charAt(0).toUpperCase() +
                imageObject.author.secondName.slice(1)}
              {userIdFetched.userId === imageObject.author._id && (
                <span className="text-blue-500  italic "> , You</span>
              )}
            </span>{" "}
          </p>
          <p>
            Posted On :
            <span className="text-blue-300">
              {new Date(Number(imageObject.date_posted)).toLocaleString()}
              {/* {new Date(Number(imageObject.createdAt)).toLocaleString()} */}
              {/* {new Date(Number(imageObject.createdAt)).toISOString()} */}
            </span>
          </p>
        </div>
        {userIdFetched.userId === imageObject.author._id && (
          <div className="flex mt-4 gap-4 text-xl ">
            {!isLoading && (
              <AiTwotoneDelete
                className="cursor-pointer hover:text-red-800"
                onClick={deleteImageHandler}
              />
            )}
            <RingLoader
              color={color}
              loading={isLoading}
              cssOverride={override}
              size={30}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Photo;
