"use client";

import { useEffect, useRef, useState } from "react";

import Loading from "./components/Loading/Loading";
import Hero from "./components/Hero/Hero";
// import TopDrawer from "./components/TopDrawer/TopDrawer";
import Post from "./components/Post/Post";
import KeyNav from "./components/KeyNav/KeyNav";

import { fetchPhotos, fetchPhotoPage } from "@/services/photosService";
import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";

import photoblog from "./page.module.css";

// TODO: store labels here
import labels from "../master.json";

const queryClient = new QueryClient();

const PhotoBlog = () => {
  const observerTarget = useRef<HTMLDivElement>(null);

  const {
    data: allPhotos,
    isLoading: areAlPhotosLoading,
    isError: loadAllPhotosError,
  } = useQuery({
    queryKey: ["allPhotos"],
    queryFn: fetchPhotos,
    staleTime: Infinity,
  });

  const {
    data: photoPageData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["photos", allPhotos],
    queryFn: fetchPhotoPage,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: !!allPhotos && allPhotos.length > 0,
    staleTime: Infinity,
  });

  const photos = photoPageData?.pages.flatMap((page) => page.photos) || [];

  useEffect(() => {
    document.title = labels.title;
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "100px",
      },
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (areAlPhotosLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-white">
        <div className="text-gray-400 text-xl">
          {labels.loading.loadAllPhotosBlurb}
        </div>
      </div>
    );
  }

  if (loadAllPhotosError) {
    return <h1>D:</h1>;
  }

  return (
    <>
      <div className={photoblog.mainContainer}>
        {/* Until we have a better use case, hide top drawer, as Hero contains a title */}
        {/* <TopDrawer /> */}
        {/* And key nav, as it currently does not work */}
        {/* <KeyNav /> */}
        <Hero />
        {/* Temp cutoff to make sure we get exif data and limit calls */}
        {photos.map((id, index) => (
          <Post key={index} publicId={id} />
        ))}
        {isFetchingNextPage && (
          <div>
            <Loading />
          </div>
        )}
      </div>
      <div
        ref={observerTarget}
        style={{ height: "100px", marginTop: "20px", bottom: "0" }}
      />
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
