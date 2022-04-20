export interface CurrentGpsData {
  date: number;
  latitude: number;
  longitude: number;
  altitude: number;
  accuracy: number;
  altitudeAccuracy: number;
  heading: number;
  speed: number;
}

export function getCurrent(): CurrentGpsData | null {
  if (typeof env === "undefined" || typeof env.data === "undefined") {
    return null;
  }

  return (env.data.CURRENT_GPS as CurrentGpsData) || null;
}
