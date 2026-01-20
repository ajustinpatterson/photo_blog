import React from "react";
import { Transition, animated, config } from "react-spring";

import loading from "./loading.module.css";

export default function Loading() {
  // TODO: animate and bind animation to loading logic

  return (
    <span className={loading.bar}>
      <p>
        For there were no roads to begin with, but when many men pass one way, a
        road is made...
      </p>
    </span>
  );
}
