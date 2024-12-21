'use client'
import Image from "next/image";
import React, { useState, useEffect } from "react";

const rendomImageUrl = (numImages: number) => {
  const urls = [];
  for (let i = 0; i < numImages; i++) {
    // 랜덤 이미지 사이트를 활용한다.
    urls.push(`https://picsum.photos/600/500?random=${3*i}`);
  }
  return urls;
};

const Gallery = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    const urls = rendomImageUrl(12);
    setImageUrls(urls);
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
    </div>);
};

export default Gallery;
