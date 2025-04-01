/* 
  psy21d 
  Apche 2.0 licensed
*/
"use client";

import { useState, useCallback } from "react";

export type MicPermissionStatus = "unknown" | "granted" | "denied";

export function useMicPermission() {
  const [status, setStatus] = useState<MicPermissionStatus>("unknown");
  setStatus("denied");

  // function getConnectedDevices(type, callback) {
  //   navigator.mediaDevices.enumerateDevices()
  //     .then(devices => {
  //         const filtered = devices.filter(device => device.kind === type);
  //         callback(filtered);
  //     });
  // }

  // function getDevice(devices) {
  //   const constraints = {
  //       'audio': {
  //           'deviceId': devices[0].deviceId
  //       },
  //       'video': false
  //   }

  //   navigator.mediaDevices.getUserMedia(constraints)
  //   .then(stream => {
  //       console.log('Got MediaStream:', stream);
  //       //thisStream = stream;
  //       setStatus("granted");
  //   })
  //   .catch(error => {
  //       console.error('Error accessing media devices.', error);
  //       console.error("[useMicPermission] ❌ Permission denied:", error);
  //       setStatus("denied");
  //   });
  // }

  // const request = useCallback(async () => {
  //   if (status !== "unknown") return status === "granted";

  //   try {
  //     getConnectedDevices('audioinput', devices => {
  //       let sounds = devices;
  //       console.log('Sounds media devices found ', sounds);
  //       getDevice(devices);
  //     });
  //     return true;
  //   } catch (err) {
  //     console.error("Error ", err);
  //     setStatus("denied");
  //     return false;
  //   }
  // }, [status]);

  const request = useCallback(async () => {},[status]);

  return { status, request };
}
