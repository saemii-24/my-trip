import React from 'react';
import Image from 'next/image';

const Card = () => {
  return (
    <div>
      <div className='relative'>
        <Image src='/gyeongbok-palace.jpg' alt='경복궁' width={100} height={100} />
      </div>
      <div>
        <h2>여행지 이름</h2>
        <div>장소</div>
        <div>좋아요</div>
      </div>
    </div>
  );
};

export default Card;
