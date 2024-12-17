import React, { useEffect, useRef, useCallback } from 'react';

interface SearchBoxProps {
  maps: typeof google.maps;
  onPlacesChanged: (places: google.maps.places.PlaceResult[]) => void;
  placeholder?: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  maps,
  onPlacesChanged,
  placeholder = '여행지를 검색하세요.',
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);

  const handleOnPlacesChanged = useCallback(() => {
    if (searchBoxRef.current) {
      const places = searchBoxRef.current.getPlaces();
      onPlacesChanged(places || []);
    }
  }, [onPlacesChanged]);

  useEffect(() => {
    if (maps && inputRef.current) {
      searchBoxRef.current = new maps.places.SearchBox(inputRef.current);

      searchBoxRef.current.addListener('places_changed', handleOnPlacesChanged);
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

export default React.memo(SearchBox);
