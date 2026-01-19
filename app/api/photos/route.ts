import { NextResponse } from "next/server";

import {
  PROTOCOL,
  CLOUDINARY_CLOUD_NAME,
  BASE_URL,
  PHOTO_ENDPOINT,
  TAG,
} from "../../../constants";

export async function GET(request: Request) {
  try {
    const response = await fetch(
      `${PROTOCOL}://${BASE_URL}/${CLOUDINARY_CLOUD_NAME}/${PHOTO_ENDPOINT}/${TAG}.json?media_metadata=true`,
      { method: "GET" },
    );

    const data = await response.json();

    return NextResponse.json(data, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to fetch photos:", error);
    return NextResponse.json(
      { error: "Failed to fetch photos" },
      { status: 500 },
    );
  }
}
