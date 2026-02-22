import { CldImage } from "next-cloudinary";

import { useQuery } from "@tanstack/react-query";
import { fetchPhotoMetadata } from "@/services/photosService";

import PostDrawer from "../PostDrawer/PostDrawer";

import { EXIFData } from "@/types";

import photo from "./photo.module.css";

const Photo = ({ publicId }: { publicId: string }) => {
  const {
    data: metadata,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [`photoMetadata-${publicId}`],
    queryFn: () => fetchPhotoMetadata(publicId),
    staleTime: Infinity,
  });

  if (error) {
    console.warn(error);
  }

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
      {/* We don't have to show the user an error, just don't display photo drawer in error case */}
      {!isError && !isLoading && Boolean(metadata) && (
        <PostDrawer exifData={metadata as EXIFData} />
      )}
    </div>
  );
};

export default Photo;
