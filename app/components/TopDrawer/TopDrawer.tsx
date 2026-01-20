import { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";

import "./topdrawer.module.scss";

export default function TopDrawer() {
  const [isBooped, setIsBooped] = useState(false);

  const TIMING = 150;

  const [props] = useSpring(
    () => ({
      from: { y: 0, opacity: 1 },
      to: isBooped ? { y: 0, opacity: 1 } : 0,
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

  return (
    <animated.div
      onMouseEnter={trigger}
      onMouseLeave={exit}
      className="top-drawer-container"
      style={props}
    >
      <div className="top-drawer-text">Everyday Shadows</div>
    </animated.div>
  );
}
