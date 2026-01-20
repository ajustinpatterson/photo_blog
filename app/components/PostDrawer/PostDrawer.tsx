import React, { useEffect, useState } from "react";
import { useSpring, animated, config } from "react-spring";

import PhotoInfoContainer from "./PhotoInfoContainer/PhotoInfoContainer";
import PhotoInteractionContainer from "./PhotoInteractionContainer/PhotoInteractionContainer";

import postdrawer from "./postdrawer.module.css";

export default function PostDrawer({ photo }) {
  const [isBooped, setIsBooped] = useState(false);

  const TIMING = 150;

  const [props] = useSpring(
    () => ({
      display: "inline-block",
      backfaceVisibility: "hidden",
      from: { y: 0, opacity: 0 },
      to: isBooped ? { y: -10, opacity: 1 } : 0,
    }),
    []
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

  return (
    <animated.div
      onMouseEnter={trigger}
      onMouseLeave={exit}
      className={postdrawer.postDrawerContainer}
      style={props}
    >
      <PhotoInfoContainer photo={photo} />
      <PhotoInteractionContainer photo={photo} />
    </animated.div>
  );
}
