import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import SearchBox from './SearchBox'; // SearchBox를 별도의 컴포넌트로 관리

export interface Props {
  location?: {
    lat: number;
    lng: number;
  };
  zoom?: number;
}

const containerStyle = {
  width: '100%',
  height: '100vh',
};

const defaultLocation = {
  lat: 37.5665,
  lng: 126.978,
};

const GoogleMapComponent: React.FC<Props> = ({
  location = defaultLocation,
  zoom = 14,
}: Props) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API || '',
    libraries: ['places'], // Places 라이브러리 추가
    language: 'ko',
    region: 'KR',
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [currentLocation, setCurrentLocation] = useState(location);
  const [markers, setMarkers] = useState<google.maps.LatLngLiteral[]>([]); // 검색 결과 마커 상태 관리

  const onLoad = useCallback(
    (map: google.maps.Map) => {
      map.setZoom(zoom);
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

  // SearchBox에서 검색 결과를 가져오는 함수
  const handlePlacesChanged = (places: google.maps.places.PlaceResult[]) => {
    if (!places.length) return;

    // 검색 결과 위치 마커 업데이트
    const newMarkers = places
      .map((place) => place.geometry?.location)
      .filter(Boolean)
      .map((location) => ({
        lat: location!.lat(),
        lng: location!.lng(),
      }));

    setMarkers(newMarkers);

    // 첫 번째 검색 결과를 지도 중심으로 설정
    if (newMarkers.length) {
      setCurrentLocation(newMarkers[0]);
    }
  };

  if (loadError) return <div>지도를 불러오는 중 오류가 발생했습니다.</div>;

  return isLoaded ? (
    <div>
      <SearchBox
        maps={google.maps} // Google Maps 객체 전달
        onPlacesChanged={handlePlacesChanged}
        placeholder='장소 검색...'
      />
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentLocation}
        onLoad={onLoad}
        onUnmount={onUnmount}
        zoom={zoom}
      >
        {/* 사용자 위치 마커 */}
        <Marker position={currentLocation} />

        {/* 검색된 마커 표시 */}
        {markers.map((marker, index) => (
          <Marker key={index} position={marker} />
        ))}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
};

export default React.memo(GoogleMapComponent);
