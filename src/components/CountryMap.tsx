import React, { useEffect, useState } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

interface LatLng {
  lat: number;
  lng: number;
}

const CountryMap = ({ country }: { country: string }) => {
  const [position, setPosition] = useState<LatLng | null>(null);

  // Geocoding API로 국가명 → 좌표 변환
  useEffect(() => {
    const fetchCoordinates = async () => {
      const response = await fetch(`https://restcountries.com/v3.1/name/South%20Korea`);
      const data = await response.json();
      if (data.results?.[0]) {
        const loc = data.results[0].geometry.location;
        setPosition({ lat: loc.lat, lng: loc.lng });
      }
    };
    fetchCoordinates();
  }, [country]);

  return <div></div>;
};

export default CountryMap;
