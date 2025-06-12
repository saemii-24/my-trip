import React from 'react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

interface LatLng {
  lat: number;
  lng: number;
}
type Poi = { key: string; location: google.maps.LatLngLiteral };

const CountryLocationMap = ({ lat, lng }: LatLng) => {
  const center = { lat, lng };

  const location: Poi = { key: '대한민국', location: { lat, lng } };

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API}>
        <Map defaultZoom={5} defaultCenter={{ lat, lng }} mapId='CountryInfoMap'>
          <AdvancedMarker key={location.key} position={location.location}>
            <Pin background={'#38aff8'} glyphColor={'#c4f244'} borderColor={'#38aff8'} />
          </AdvancedMarker>
        </Map>
      </APIProvider>
    </div>
  );
};

export default CountryLocationMap;
