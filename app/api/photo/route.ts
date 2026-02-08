import { NextResponse } from "next/server";

import {
  PROTOCOL,
  CLOUDINARY_CLOUD_NAME,
  BASE_URL,
  PHOTO_ENDPOINT,
  TAG,
  API_KEY,
  CLOUDINARY_KEY,
  BASE_NODE_ENDPOINT,
  PHOTO_INDV_ENDPOINT,
  WITH_METADATA,
} from "../../../constants";

export async function GET(request: Request, photoID: string) {
  try {
    const response = await fetch(
      `${PROTOCOL}://${API_KEY}:${CLOUDINARY_KEY}@${BASE_NODE_ENDPOINT}/${PHOTO_INDV_ENDPOINT}/${photoID}${WITH_METADATA}`,
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
