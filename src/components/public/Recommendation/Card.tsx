import AngleDoubleRight from '@components/icon/AngleDoubleRight';
import ArrowRight from '@components/icon/ArrowRight';

interface CardProps {
  title: string;
  description: string;
}

const Card = ({ title, description }: CardProps) => {
  return (
    <div className='relative pt-[330px] group rounded-[60px]  bg-lime-500 p-6 transition-all duration-300 flex flex-col gap-5 cursor-pointer'>
      <button className='bg-white size-16 rounded-full center-flex absolute top-6 right-6'>
        <ArrowRight className='size-10' />
      </button>
      <h3 className='text-4xl font-semibold transition-colors break-keep w-[50%] text-white'>
        {title}
      </h3>
      <p className=' text-sm w-[70%] text-white'>{description}</p>
      <button className='bg-white w-full text-start px-6 py-4 pr-4 rounded-full flex justify-between items-center'>
        <span>여행지 살펴보기</span>
        <AngleDoubleRight className='size-6' />
      </button>
    </div>
  );
};

export default Card;
