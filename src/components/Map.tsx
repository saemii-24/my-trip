'use client';

import React from 'react';
import { APIProvider, Map } from '@vis.gl/react-google-maps';

const GoogleMap = () => (
  <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API || ''}>
    <Map
      style={{ width: '100vw', height: '100vh' }}
      defaultCenter={{ lat: 22.54992, lng: 0 }}
      defaultZoom={3}
      gestureHandling='greedy'
      disableDefaultUI={true}
    />
  </APIProvider>
);

export default GoogleMap;
