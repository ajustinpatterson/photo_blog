import { useEffect, useState } from "react";
import { CldImage } from "next-cloudinary";

import { useQuery } from "@tanstack/react-query";
import { fetchPhotoMetadata } from "@/services/photosService";

import PostDrawer from "../PostDrawer/PostDrawer";

import photo from "./photo.module.css";

const Photo = ({ publicId }: { publicId: string }) => {
  const [metadata, setMetadata] = useState(null);
  // TODO: if no caption, do not show drawer
  const caption = null;

  useEffect(() => {
    if (!Boolean(metadata)) {
      fetchPhotoMetadata(publicId).then((data) =>
        console.log("METADATA: ", data),
      );
    }
  });

  return (
    <div className={photo.photoPostContainer}>
      <CldImage
        className={photo.photoPost}
        width="960"
        height="600"
        src={publicId}
        sizes="100vw"
        alt="Description of my image"
      />
    </div>
  );
};

export default Photo;
