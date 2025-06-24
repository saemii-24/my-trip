// 'use client';
// import usePlacePhotoGet from '@query/usePlacePhotoGet';

// export default function GoogleImage() {
//   const { placePhotoData, placePhotoIsLoading, placePhotoIsError } =
//     usePlacePhotoGet('타이베이 101');

//   if (placePhotoIsLoading) return <div>Loading...</div>;
//   if (placePhotoIsError) return <div>Failed to load photo</div>;

//   return (
//     <div>
//       {placePhotoData?.imageUrl ? (
//         <img src={placePhotoData.imageUrl} alt='장소 이미지' />
//       ) : (
//         <div>No photo available</div>
//       )}
//     </div>
//   );
// }
'use client';

import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

export default function DualDateRangePicker() {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection',
    },
  ]);

  return (
    <DateRangePicker
      onChange={(item) => setRange([item.selection])}
      showSelectionPreview={true}
      moveRangeOnFirstSelection={false}
      months={2}
      direction='horizontal'
      ranges={range}
    />
  );
}
