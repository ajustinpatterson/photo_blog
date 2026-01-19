"use client";

import { useEffect } from "react";
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
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

const PhotoBlog = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["photos"],
    queryFn: fetchPhotos,
  });

  return <h1>Hello, Next.js!</h1>;
};

const Page = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <PhotoBlog />
    </QueryClientProvider>
  );
};

export default Page;
