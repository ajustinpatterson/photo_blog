import React from "react";

import photodate from "./photodate.module.css";

export default function PhotoDate({ date }) {
  // TODO: pass date as prop, use interesting font
  return (
    <div className={photodate.date}>
      {date && `${new Date(date).toLocaleDateString()}`}
    </div>
  );
}
