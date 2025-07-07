import Link from 'next/link';
import Container from './Container';
import { footerLink, FooterLinkType } from '@constant/footer';
import { cn } from '@utils/cn';

const Footer = () => {
  return (
    <footer className='bg-white -text-sm  px-6 py-12 text-gray-500'>
      <Container className='flex justify-between items-center'>
        {/* 포트폴리오 완성시 link 추가 */}
        {/* <div className='font-bold text-lime-400 text-lg w-[300px]'>My Ai Trip</div> */}

        <FooterList list={footerLink} />

        <div className='text-center md:text-right w-[300px]'>
          &copy; {new Date().getFullYear()} Saemii. All rights reserved.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

interface FooterListProps {
  list: FooterLinkType[];
  className?: string;
}
const FooterList = ({ list, className }: FooterListProps) => {
  return (
    <ul className={cn('gap-2 flex items-center', className)}>
      {list.map((item) => (
        <li
          key={item.id}
          className='border rounded-full px-3 hover:bg-lime-50 border-gray-300'
        >
          <Link href={item.link}>{item.title}</Link>
        </li>
      ))}
    </ul>
  );
};
