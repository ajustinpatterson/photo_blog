import React from "react";

import photointeractions from "./photointeractions.module.css";

export default function PhotoInteractionContainer() {
  // TODO: get icon for button, implement share logic
  return (
    <div className={photointeractions.container}>
      <div className={photointeractions.likeButton}>Like</div>
    </div>
  );
}
