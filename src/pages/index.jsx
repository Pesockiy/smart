import { getIndexPageData } from "@/contentful/pages";

import Hero from "@/components/Hero/Hero";
import ScienceBased from "@/components/ScienceBased/ScienceBased";
import BenefitFrom from "@/components/BenefitFrom/BenefitFrom";
import FaqSection from "@/components/FaqSection/FaqSection";

import "swiper/css";

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

Home.getInitialProps = async () => {
  const data = await getIndexPageData();

  return { data };
};

export default Home;
