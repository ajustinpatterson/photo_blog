"use client";

import { useEffect } from "react";

const fetchPhotos = async () => {
  try {
    const response = await fetch(`/api/photos`);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

const Page = () => {
  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);
  return <h1>Hello, Next.js!</h1>;
};

export default Page;
