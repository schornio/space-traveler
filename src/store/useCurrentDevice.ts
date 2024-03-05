import { useEffect, useState } from "react";

export type SupportedDevices = {
  web: "web";
  touchDevice: "touchDevice"; // phones and tablets
  vr: "vr";
};

function isVR() {
  const userAgent = navigator.userAgent.toLocaleLowerCase();
  const VRTerms = ["Quest", "OculusBrowser", "VR"].map((term) => {
    return userAgent.includes(term.toLocaleLowerCase());
  });

  return VRTerms.includes(true);
}

function isTouchDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

function checkCurrentDevice(): keyof SupportedDevices {
  if (isTouchDevice()) {
    return "touchDevice";
  }

  if (isVR()) {
    return "vr";
  }

  return "web";
}

export function useCurrentDevice() {
  const [currentDevice, setCurrentDevice] =
    useState<keyof SupportedDevices>("web");

  useEffect(() => {
    setCurrentDevice(checkCurrentDevice());
  }, []);

  return currentDevice;
}
