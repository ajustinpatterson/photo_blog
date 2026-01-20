import { CldImage } from "next-cloudinary";

import PostDrawer from "../PostDrawer/PostDrawer";

import photo from "./photo.module.css";

const Photo = ({ publicId }: { publicId: string }) => {
  // TODO: if no caption, do not show drawer
  const caption = null;

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
