import { useEffect, useState } from "react";

export type SupportedDevices = {
  web: "web";
  touchDevice: "touchDevice"; // phones and tablets
  vr: "vr";
};

async function isVR() {
  if (navigator.xr?.ondevicechange !== undefined) {
    try {
      const isSupported = await navigator.xr.isSessionSupported("immersive-vr");
      if (isSupported) {
        return true;
      }
    } catch (error) {
      console.error("Error checking WebXR support:", error);
    }
  }

  return false;
}

function isTouchDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

async function checkCurrentDevice(): Promise<keyof SupportedDevices> {
  if (isTouchDevice()) {
    return "touchDevice";
  }

  if (await isVR()) {
    return "vr";
  }

  return "web";
}

export function useCurrentDevice() {
  const [currentDevice, setCurrentDevice] =
    useState<keyof SupportedDevices>("web");

  useEffect(() => {
    checkCurrentDevice().then(setCurrentDevice);
  }, []);

  return currentDevice;
}
