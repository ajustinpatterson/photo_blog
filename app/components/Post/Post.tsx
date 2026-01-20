import Photo from "../Photo/Photo";

import post from "./post.module.css";

export default function Post({ publicId }: { publicId: string }) {
  return (
    <div className={post.post}>
      <Photo publicId={publicId} />
    </div>
  );
}
