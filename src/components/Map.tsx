import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

export interface Props {
  location?: {
    lat: number;
    lng: number;
  };
  zoom: number;
}

const containerStyle = {
  width: '100%',
  height: '100vh',
};

// 서울  위치
const defaultLocation = {
  lat: 37.5665,
  lng: 126.978,
};

const GoogleMapComponent: React.FC<Props> = ({
  location = defaultLocation,
  zoom = 14,
}: Props) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API || '',
    language: 'ko', // 언어
    region: 'KR', // 지역
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [currentLocation, setCurrentLocation] = useState(location); // 사용자 위치 상태

  const onLoad = useCallback(
    function callback(map: google.maps.Map) {
      map.setZoom(zoom); //
      setMap(map);
    },
    [zoom],
  );

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  // 사용자 위치 가져오기
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('사용자 위치를 가져올 수 없습니다:', error);
        },
      );
    }
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={currentLocation} // 지도 중심은 사용자 위치
      onLoad={onLoad}
      onUnmount={onUnmount}
      zoom={zoom} // zoom 크기 설정정
    >
      <Marker position={currentLocation} /> {/* 사용자 위치 마커 표시 */}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default React.memo(GoogleMapComponent);
