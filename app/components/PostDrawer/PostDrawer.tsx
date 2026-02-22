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
    <div>
      {Caption && <div>{Caption}</div>}
      {Boolean(camera) && (
        <div className="flex">
          {Make && <h4>{Make}</h4>}
          {Model && <p>{Model}</p>}
        </div>
      )}
      {Boolean(speed) && (
        <div>
          <h4>{`${photoInfo.shutterSpeed}: `}</h4>
          <p>{speed}</p>
        </div>
      )}
      {Boolean(aperture) && (
        <div>
          <h4>{`${photoInfo.fStop}: `}</h4> <p>{aperture}</p>
        </div>
      )}
      {Boolean(ISO) && (
        <div>
          <h4>{`${photoInfo.iso}: `}</h4> <p>{ISO}</p>
        </div>
      )}
      {Boolean(CreateDate) && (
        <div>
          {" "}
          <h4>{`${photoInfo.createDate}: `}</h4> <p>{CreateDate}</p>
        </div>
      )}
      {Boolean(ExposureCompensation) && (
        <div>
          <h4>{`${photoInfo.exposureCompensation}: `}</h4>{" "}
          <p>{ExposureCompensation}</p>
        </div>
      )}
      {Boolean(Flash) && (
        <div>
          <h4>{`${photoInfo.flash}: `}</h4> <p>{Flash}</p>
        </div>
      )}
      {Boolean(FocalLength) && (
        <div>
          <h4>{`${photoInfo.focalLength}: `}</h4> <p>FocalLength</p>
        </div>
      )}
    </div>
  );
}
