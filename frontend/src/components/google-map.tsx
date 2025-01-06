"use client";

import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const GoogleMap = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: import.meta.env.VITE_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        version: "weekly",
      });

      const { Map } = await loader.importLibrary("maps");
      const { Marker } = await loader.importLibrary("marker");

      const position = {
        lat: 40.73061,
        lng: -73.935242,
      };

      const mapOptions: google.maps.MapOptions = {
        center: position,
        zoom: 10,
      };

      const map = new Map(
        mapRef.current as unknown as HTMLDivElement,
        mapOptions,
      );

      new Marker({
        map: map,
        position: position,
      });
    };

    initMap();
  }, []);

  return (
    <div className="my-4 aspect-video w-full flex-1 rounded-2xl" ref={mapRef} />
  );
};

export default GoogleMap;
