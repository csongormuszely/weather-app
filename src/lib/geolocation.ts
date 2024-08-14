"use client";

type Position = {
  latitude: number;
  longitude: number;
};

type CityInfo = {
  city: string;
};

export const getCurrentCity = async (): Promise<CityInfo | null> => {
  try {
    const position = await getCurrentPosition();
    const { latitude, longitude } = position;

    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch city data");
    }

    const data = await response.json();

    return {
      city:
        data.address.city ||
        data.address.town ||
        data.address.village ||
        "Unknown City",
    };
  } catch (error) {
    console.error("Error getting current city:", error);
    return null;
  }
};

const getCurrentPosition = (): Promise<Position> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser"));
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => reject(error)
    );
  });
};
