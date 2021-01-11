import React from "react"
import { Link } from "gatsby"
import ImageCropper from "./imageCropper"
import { LeftArrowIcon, RightArrowIcon } from "../icons"
import { Card } from "@windmill/react-ui"

const PhotoUpload = () => {
  return (
    <>
      <Card className="flex-col p-4 mb-4 border">
        <ImageCropper />
      </Card>
      <div className="flex flex-row justify-between w-full">
        <Link
          to="/profile/employment"
          className="w-4/12 p-4 text-white bg-blue-500 rounded-lg shadow-sm md:w-2/12 hover:bg-blue-700"
        >
          <LeftArrowIcon width="100%" height="1.3em" />
        </Link>
        <Link
          to="/profile/review"
          className="w-4/12 p-4 text-white bg-blue-500 rounded-lg shadow-sm md:w-2/12 hover:bg-blue-700"
          data-testid="profile__photo__button_next"
        >
          <RightArrowIcon width="100%" height="1.3em" />
        </Link>
      </div>
    </>
  )
}

export default PhotoUpload
