import { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";

import { EXIFData } from "@/types";
import labels from "../../../master.json";

import postdrawer from "./postdrawer.module.css";

export default function PostDrawer({
  exifData,
}: Readonly<{ exifData: EXIFData }>) {
  const [isBooped, setIsBooped] = useState(false);
  const { photoInfo } = labels;
  const {
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

  const [props] = useSpring(
    () => ({
      display: "inline-block",
      backfaceVisibility: "hidden",
      from: { y: 0, opacity: 0 },
      to: isBooped ? { y: -10, opacity: 1 } : 0,
    }),
    [],
  );

  const trigger = () => {
    setTimeout(() => setIsBooped(true), 1000);
  };

  const exit = () => {
    setIsBooped(false);
  };

  useEffect(() => {
    setIsBooped(false);
  }, []);

  // TODO: different styles for values vs keys
  return (
    <animated.div
      onMouseEnter={trigger}
      onMouseLeave={exit}
      className={postdrawer.postDrawerContainer}
      style={props}
    >
      <div className="flex">
        {Boolean(camera) && (
          <div className="flex">
            {Make && <h3>{`${photoInfo.camera}: ${Make}`}</h3>}
            {Model && <h4>{`Model`}</h4>}
          </div>
        )}
        {Boolean(speed) && (
          <h3>{`${photoInfo.shutterSpeedValue}: ${speed}`}</h3>
        )}
        {Boolean(aperture) && (
          <h3>{`${photoInfo.apertureValue}: ${aperture}`}</h3>
        )}
        {Boolean(ISO) && <h3>{`${photoInfo.iso}: ${ISO}`}</h3>}
        {Boolean(CreateDate) && (
          <h3>{`${photoInfo.createDate}: ${CreateDate}`}</h3>
        )}
        {Boolean(ExposureCompensation) && (
          <h3>{`${photoInfo.exposureCompensation}: ${ExposureCompensation}`}</h3>
        )}
        {Boolean(Flash) && <h3>{`${photoInfo.flash}: ${Flash}`}</h3>}
        {Boolean(FocalLength) && (
          <h3>{`${photoInfo.focalLength}: ${FocalLength}`}</h3>
        )}
      </div>
    </animated.div>
  );
}
