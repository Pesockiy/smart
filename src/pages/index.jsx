import { getIndexPageData } from '@/contentful/pages';

import Hero from '@/components/Hero/Hero';
import ScienceBased from '@/components/ScienceBased/ScienceBased';
import BenefitFrom from '@/components/BenefitFrom/BenefitFrom';
import FaqSection from '@/components/FaqSection/FaqSection';

import 'swiper/css';

import { CONTENT_TYPE } from '@/contentful/pages';

const Home = ({ data }) => {
  return (
    <>
      <Hero data={data[0].fields} />
      <FaqSection />
      <ScienceBased wrapper />
      <BenefitFrom wrapper />
    </>
  );
};

export const getServerSideProps = async () => {
  const data = await getIndexPageData(CONTENT_TYPE);

  return { props: { data } };
};

export default Home;
