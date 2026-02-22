import { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import { formatDateTime } from "@/app/utils";

import { EXIFData } from "@/types";
import labels from "../../../master.json";

import postdrawer from "./postdrawer.module.css";

export default function PostDrawer({
  exifData,
}: Readonly<{ exifData: EXIFData }>) {
  const [isBooped, setIsBooped] = useState(false);
  const { photoInfo } = labels;
  const {
    Caption,
    Make,
    Model,
    ExposureTime,
    FNumber,
    ISO,
    CreateDate,
    ShutterSpeedValue,
    ApertureValue,
    ExposureCompensation,
    Flash,
    FocalLength,
  } = exifData;

  const camera = Make || Model;
  const speed = ShutterSpeedValue || ExposureTime;
  const aperture = FNumber || ApertureValue;
  const localeDate = CreateDate && formatDateTime(CreateDate);

  const [props] = useSpring(
    () => ({
      from: { y: 0, opacity: 0 },
      to: isBooped ? { y: -60, opacity: 1 } : 0,
    }),
    [isBooped],
  );
  const trigger = () => {
    setTimeout(() => setIsBooped(true), 500);
  };

  const exit = () => {
    setIsBooped(false);
  };

  useEffect(() => {
    setIsBooped(false);
  }, []);

  const exifDataDiv = (title: string, value: string | undefined) => (
    <div className={postdrawer.words}>
      <h4>{title}</h4>
      <p className={postdrawer.value}>{value ?? "-"}</p>
    </div>
  );

  return (
    <animated.div
      onMouseEnter={trigger}
      onMouseLeave={exit}
      className={postdrawer.postDrawerContainer}
      style={props}
    >
      {Boolean(Caption) && <i className={postdrawer.caption}>{Caption}</i>}
      {Boolean(localeDate) && exifDataDiv(photoInfo.createDate, localeDate)}
      {Boolean(camera) && (
        <div className={postdrawer.words}>
          {Make && <h4>{Make}</h4>}
          {Model && <p className={postdrawer.value}>{Model}</p>}
        </div>
      )}
      {Boolean(speed) && exifDataDiv(photoInfo.shutterSpeed, speed)}
      {Boolean(aperture) && exifDataDiv(photoInfo.fStop, aperture)}
      {Boolean(ISO) && exifDataDiv(photoInfo.iso, ISO)}
      {Boolean(ExposureCompensation) &&
        exifDataDiv(photoInfo.exposureCompensation, ExposureCompensation)}
      {Boolean(Flash) && exifDataDiv(photoInfo.flash, Flash)}
      {Boolean(FocalLength) && exifDataDiv(photoInfo.focalLength, FocalLength)}
    </animated.div>
  );
}
