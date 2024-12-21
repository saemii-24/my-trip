'use client'
import Image from "next/image";
import React, { useState, useEffect } from "react";

const rendomImageUrl = (numImages: number) => {
  const urls = [];
  for (let i = 0; i < numImages; i++) {
    urls.push(`https://picsum.photos/600/500?random=${3 * i}`);
  }
  return urls;
};

interface GalleryProps {
  numImages?: number;
  //스토리북 사용자가 랟넘 이미지를 불러올 수 있도록 조치한다.
  onReloadImages?: () => void; 
}

const Gallery: React.FC<GalleryProps> = ({ numImages = 12, onReloadImages }) => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const loadImages = () => {
    const urls = rendomImageUrl(numImages);
    setImageUrls(urls);
    if (onReloadImages) onReloadImages(); 
  };

  useEffect(() => {
    loadImages();
  }, []);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {imageUrls.map((url, idx) => (
          <div
            key={idx}
            className="relative h-[300px] w-full overflow-hidden rounded-lg shadow-md"
          >
            <Image
              src={url}
              fill
              alt={`${idx}번째의 랜덤 이미지`}
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
