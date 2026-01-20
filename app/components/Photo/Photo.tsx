import { CldImage } from "next-cloudinary";

import "./photo.module.scss";

const Photo = ({ publicId }: { publicId: string }) => {
  // TODO: if no caption, do not show drawer

  return (
    <div className="photoPostContainer">
      <CldImage
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
