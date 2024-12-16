import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

// 초기 지도는 서울로
const center = {
  lat: 37.5665, // 위도
  lng: 126.978, // 경도
};

const containerStyle = {
  width: '100%',
  height: '500px',
};

const App = () => {
  const [currentLocation, setCurrentLocation] = useState(center);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API || '', // .env 파일에 저장한 API 키
  });

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
          console.error('지도 불러오기 실패:', error);
        },
      );
    }
  }, []);

  if (!isLoaded) return <div>로딩중...</div>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={currentLocation} zoom={15}>
      <Marker position={currentLocation} />
    </GoogleMap>
  );
};

export default App;
