import { PHOTOS_PER_PAGE } from "@/constants";

const fetchPhotos = async () => {
  try {
    const response = await fetch(`/api/photos`);
    const data = await response.json();
    const { resources } = data;
    const result = resources
      .sort((a, b) => a?.created_at > b?.created_at)
      .map((el: any) => el.public_id);
    return result;
  } catch (error) {
    console.error(error);
  }
};

const fetchPhotoPage = async ({
  pageParam = 0,
  queryKey,
}: {
  pageParam?: number;
  queryKey: any;
}) => {
  const allPhotos = queryKey[1]; // Get allPhotos from query key
  const start = pageParam * PHOTOS_PER_PAGE;
  const end = start + PHOTOS_PER_PAGE;
  return {
    photos: allPhotos.slice(start, end),
    nextPage: end < allPhotos.length ? pageParam + 1 : undefined,
  };
};

export { fetchPhotos, fetchPhotoPage };
