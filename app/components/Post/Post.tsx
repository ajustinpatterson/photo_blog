import React from "react";

import PhotoResource from "./PhotoResource/PhotoResource";

import post from "./post.module.css";

export default function Post({ photo }) {
  return (
    <div className={post.post}>
      <PhotoResource photo={photo} />
    </div>
  );
}
