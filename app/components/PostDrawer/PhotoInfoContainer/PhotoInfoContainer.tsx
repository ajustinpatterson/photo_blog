import React from "react";

import PhotoCaption from "./PhotoCaption/PhotoCaption";
import PhotoDate from "./PhotoDate/PhotoDate";

import container from "./photoinfocontainer.module.css";

export default function PhotoInfoContainer({ photo }) {
  const { created, context } = photo;
  return (
    <div className={container.photoInfoContainer}>
      <PhotoDate date={created} />
      <PhotoCaption context={context && context?.custom} />
    </div>
  );
}
