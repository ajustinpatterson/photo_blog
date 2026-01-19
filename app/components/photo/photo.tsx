import { CldImage } from "next-cloudinary";

import "./photo.module.scss";

const Photo = () => {
  // TODO: if no caption, do not show drawer

  return (
    <div className="photoPostContainer">
      {/* <img alt="alt" className='photoPost' src={photo.secureUrl} /> */}
      <CldImage
        width="960"
        height="600"
        src="main-sample"
        sizes="100vw"
        alt="Description of my image"
      />
    </div>
  );
};

export default Photo;
