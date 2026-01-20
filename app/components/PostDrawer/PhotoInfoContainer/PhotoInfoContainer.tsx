import React from "react";

import PhotoCaption from "./PhotoCaption/PhotoCaption";

import container from "./photoinfocontainer.module.css";

export default function PhotoInfoContainer({
  caption,
}: Readonly<{ caption: string }>) {
  return (
    <div className={container.photoInfoContainer}>
      <PhotoCaption caption={caption} />
    </div>
  );
}
