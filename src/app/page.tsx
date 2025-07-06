import Advisory from '@components/Advisory';
import Benefits from '@components/public/Benefits';
import Container from '@components/public/Container';
import Header from '@components/public/Header';
import Hero from '@components/public/Hero';
import Recommendation from '@components/public/Recommendation/Recommendation';

export default function Page() {
  return (
    <>
      <Hero />
      <Benefits />
      <Recommendation />
      <Advisory />
    </>
  );
}
