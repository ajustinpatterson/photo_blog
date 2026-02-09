// Endpoint to hit: `${PROTOCOL}://${API_KEY}:${CLOUDINARY_KEY}@${BASE_NODE_ENDPOINT}/${CLOUDINARY_CLOUD_NAME}/${PHOTO_INDV_ENDPOINT}/${photoId}${WITH_METADATA}`
import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import cors, { CorsOptions } from "cors";
import { log } from "console";

const router = express.Router();
const app = express();

dotenv.config();

const corsOptions: CorsOptions = {
  origin: (
    origin: string | undefined,
    callback: (arg1: Error | null, arg2?: boolean) => void,
  ): void => {
    const allowedOrigins = process?.env?.WHITELIST?.split(", ") || "";
    log("origin: ", origin, allowedOrigins);
    // TODO: make the origin check more fine-grained
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(router);

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log("Rumble in the Bronx! " + err);
  } else {
    console.log(`Listening in on port ${process.env.PORT}`);
  }
});
