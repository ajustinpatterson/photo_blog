import React, { useEffect, useState } from "react";
import { useSpring, animated, config } from "react-spring";

import topdrawer from "./topdrawer.module.css";

export default function TopDrawer() {
  const [isBooped, setIsBooped] = useState(false);

  const TIMING = 150;

  const [props] = useSpring(
    () => ({
      from: { y: 0, opacity: 1 },
      to: isBooped ? { y: 0, opacity: 1 } : 0,
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
      className={topdrawer.container}
      style={props}
    >
      <div className={topdrawer.text}>Everyday Shadows</div>
    </animated.div>
  );
}
