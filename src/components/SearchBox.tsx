import React, { useEffect, useRef, useCallback } from 'react';

interface SearchBoxProps {
  maps: typeof google.maps;
  onPlacesChanged: (places: google.maps.places.PlaceResult[]) => void;
  placeholder?: string;
}

const SearchBox = ({ maps, onPlacesChanged, placeholder }: SearchBoxProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);

  const handleOnPlacesChanged = useCallback(() => {
    if (searchBoxRef.current) {
      const places = searchBoxRef.current.getPlaces();
      if (places?.length) {
        onPlacesChanged(places); // 검색 결과 전달

        // 장소 정보 출력
        places.forEach((place) => {
          console.log(`장소 이름: ${place.name}`);
          console.log(`주소: ${place.formatted_address}`);
          console.log(`위치:`, place.geometry?.location?.toJSON());

          // 장소 사진 정보
          if (place.photos && place.photos.length > 0) {
            const firstPhoto = place.photos[0]; // 첫 번째 사진
            const imageUrl = firstPhoto.getUrl(); // 이미지 URL
            const attribution = firstPhoto.html_attributions.join(', '); // 저작권 정보

            console.log(`이미지 URL: ${imageUrl}`);
            console.log(`저작권 정보: ${attribution}`);
          } else {
            console.log('사진 정보가 없습니다.');
          }
        });
      }
    }
  }, [onPlacesChanged]);

  useEffect(() => {
    if (maps && inputRef.current) {
      searchBoxRef.current = new maps.places.SearchBox(inputRef.current);
      searchBoxRef.current?.addListener('places_changed', handleOnPlacesChanged);
    }

    return () => {
      if (searchBoxRef.current) {
        google.maps.event.clearInstanceListeners(searchBoxRef.current);
        searchBoxRef.current = null;
      }
    };
  }, [maps, handleOnPlacesChanged]);

  return <input ref={inputRef} placeholder={placeholder} type='text' />;
};

export default SearchBox;
