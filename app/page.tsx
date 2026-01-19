"use client";

import Photo from "./components/photo/photo";
import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

const fetchPhotos = async () => {
  try {
    const response = await fetch(`/api/photos`);
    const data = await response.json();
    const { resources } = data;
    const result = resources.sort((a, b) => a?.created_at < b?.created_at);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

const PhotoBlog = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["photos"],
    queryFn: fetchPhotos,
  });

  return (
    <>
      <h1>Hello, Next.js!</h1>
      <Photo />
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
