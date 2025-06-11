import React from 'react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

interface LatLng {
  lat: number;
  lng: number;
}

const CountryMap = ({ lat, lng }: LatLng) => {
  const center = { lat, lng };
  console.log(lat, lng);

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API}>
        <Map center={center} zoom={5} style={{ width: '100%', height: '100%' }}>
          <AdvancedMarker position={{ lat: 37, lng: -95 }}>
            <Pin />
          </AdvancedMarker>
        </Map>
      </APIProvider>
    </div>
  );
};

export default CountryMap;
