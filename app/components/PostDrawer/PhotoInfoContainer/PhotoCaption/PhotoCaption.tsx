import exp from "constants";
import React from "react";

import photocaption from "./photocaption.module.css";
// TODO:
// change font
// only show if caption info
export default function PhotoCaption({ context }) {
  return (
    <div className={photocaption.photocaption}>
      {context && context?.caption}
    </div>
  );
}
