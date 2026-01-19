"use client";

import Photo from "./components/photo/photo";
import { fetchPhotos } from "@/services/photosService";
import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

const PhotoBlog = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["photos"],
    queryFn: fetchPhotos,
  });
  const photoList = data?.slice(0, 5);

  return (
    <>
      <h1>Hello, Next.js!</h1>
      {photoList?.map((id, index) => (
        <Photo key={index} publicId={id} />
      ))}
    </>
  );
};

const Page = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <PhotoBlog />
    </QueryClientProvider>
  );
};

export default Page;
