'use client';
import usePlacePhotoGet from '@query/usePlacePhotoGet';

export default function GoogleImage() {
  const { placePhotoData, placePhotoIsLoading, placePhotoIsError } =
    usePlacePhotoGet('타이베이 101');

  if (placePhotoIsLoading) return <div>Loading...</div>;
  if (placePhotoIsError) return <div>Failed to load photo</div>;

  return (
    <div>
      {placePhotoData?.imageUrl ? (
        <img src={placePhotoData.imageUrl} alt='장소 이미지' />
      ) : (
        <div>No photo available</div>
      )}
    </div>
  );
}
