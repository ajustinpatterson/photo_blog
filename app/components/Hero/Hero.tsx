import React from "react";
import hero from "./hero.module.css";

export default function Hero() {
  return (
    <div className={hero.heroContainer}>
      <img
        src="bgHeader.jpg"
        alt="horses grazing on a pampa"
        className={hero.heroBG}
      />
    </div>
  );
}
