import { useFrame } from "@react-three/fiber";
import { FontC } from "./FontC";
import { FontDot } from "./FontDot";
import { FontH } from "./FontH";
import { FontI } from "./FontI";
import { FontN } from "./FontN";
import { FontO } from "./FontO";
import { FontR } from "./FontR";
import { FontS } from "./FontS";
import { useRef } from "react";
import { Group } from "three";

export const FONT_MODELS = [
  "fontC",
  "fontDot",
  "fontH",
  "fontI",
  "fontN",
  "fontO",
  "fontR",
  "fontS",
];

export function FontRandomSelector() {
  const randomIndex = Math.floor(Math.random() * FONT_MODELS.length);
  let model;
  const ref = useRef<Group>(null);
  const randomRotation = Math.random() * 0.01;
  const randomDirection = Math.random() > 0.5 ? 1 : -1;

  // useFrame(() => {
  //   if (ref.current) {
  //     ref.current.rotation.y -= randomRotation * randomDirection;
  //   }
  // });

  switch (FONT_MODELS[randomIndex]) {
    case "fontC":
      model = <FontC />;
      break;
    case "fontDot":
      model = <FontDot />;
      break;
    case "fontH":
      model = <FontH />;
      break;
    case "fontI":
      model = <FontI />;
      break;
    case "fontN":
      model = <FontN />;
      break;
    case "fontO":
      model = <FontO />;
      break;
    case "fontR":
      model = <FontR />;
      break;
    case "fontS":
      model = <FontS />;
      break;
    default:
      model = <FontC />;
      break;
  }

  return <group ref={ref}>{model}</group>;
}
