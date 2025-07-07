import React from 'react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { cn } from '@utils/cn';

interface LatLng {
  lat: number;
  lng: number;
  zoom?: number;
  className?: string;
}
type Poi = { key: string; location: google.maps.LatLngLiteral };

const CountryLocationMap = ({ lat, lng, zoom = 5, className }: LatLng) => {
  const center = { lat, lng };

  const location: Poi = { key: '대한민국', location: { lat, lng } };

  return (
    <div className={cn('w-full h-[400px]', className)}>
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API}>
        <Map defaultZoom={zoom} defaultCenter={{ lat, lng }} mapId='CountryInfoMap'>
          <AdvancedMarker key={location.key} position={location.location}>
            <Pin background={'#38aff8'} glyphColor={'#c4f244'} borderColor={'#38aff8'} />
          </AdvancedMarker>
        </Map>
      </APIProvider>
    </div>
  );
};

export default CountryLocationMap;
