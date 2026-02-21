"use client";

import { useEffect, useRef, useState } from "react";

import Loading from "./components/Loading/Loading";
import Hero from "./components/Hero/Hero";
import TopDrawer from "./components/TopDrawer/TopDrawer";
import Post from "./components/Post/Post";
import KeyNav from "./components/KeyNav/KeyNav";

import { fetchPhotos, fetchPhotoPage } from "@/services/photosService";
import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";

import { useTransition, animated } from "react-spring";

import photoblog from "./page.module.css";

// TODO: store labels here
import labels from "../master.json";

const queryClient = new QueryClient();

const PhotoBlog = () => {
  const observerTarget = useRef<HTMLDivElement>(null);
  const photoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setCurrentPhotoIndex((prev) => {
          const nextIndex = Math.min(prev + 1, photos.length - 1);

          // Load more if we're near the end
          if (
            nextIndex >= photos.length - 2 &&
            hasNextPage &&
            !isFetchingNextPage
          ) {
            fetchNextPage();
          }

          return nextIndex;
        });
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setCurrentPhotoIndex((prev) => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [photos.length, hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    if (photoRefs.current[currentPhotoIndex]) {
      photoRefs.current[currentPhotoIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentPhotoIndex]);

  const transitions = useTransition(isFetchingNextPage, {
    key: isFetchingNextPage,
    from: { y: 0, opacity: 1 },
    enter: { y: 10, opacity: 1 },
    leave: { y: 0, opacity: 1 },
    config: { duration: 500 },
    unique: true,
  });

  if (areAlPhotosLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-white">
        <div className="text-gray-400 text-xl">Loading photos...</div>
      </div>
    );
  }

  if (loadAllPhotosError) {
    return <h1>D:</h1>;
  }

  return (
    <>
      <div className={photoblog.mainContainer}>
        <TopDrawer />
        <KeyNav />
        <Hero />
        {/* Temp cutoff to make sure we get exif data and limit calls */}
        {photos.slice(0).map((id, index) => (
          <Post key={index} publicId={id} />
        ))}
        {isFetchingNextPage &&
          transitions((style, i) => (
            <animated.div style={style}>
              <Loading />
            </animated.div>
          ))}
      </div>
      <div
        ref={observerTarget}
        style={{ height: "100px", marginTop: "20px" }}
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
