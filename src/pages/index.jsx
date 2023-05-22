import { useRef, useEffect } from 'react';
import { getIndexPageData } from '@/contentful/pages';

import Overlay from '@/common/Overlay/Overlay';

import Hero from '@/components/Hero/Hero';
import ScienceBased from '@/components/ScienceBased/ScienceBased';
import BenefitFrom from '@/components/BenefitFrom/BenefitFrom';
import FaqSection from '@/components/FaqSection/FaqSection';
import SectionService from '@/components/SectionService/SectionService';
import Animation from '@/common/Animations/Animations';
import Trainers from '@/components/Trainers/Trainers';
import SmartfitApp from '@/components/SmartfitApp/SmartfitApp';
import Testimonials from '@/components/Testimonials/Testimonials';
import PersonalTraining from '@/components/PersonalTraining/PersonalTraining';
import Comments from '@/components/Comments/Comments';
import ReferralProgram from '@/components/ReferralProgram/ReferralProgram';
import Listen from '@/components/Listen/Listen';
// import SectionMedia from '@/components/SectionMedia/SectionMedia';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import { CONTENT_TYPE } from '@/contentful/pages';

gsap.registerPlugin(ScrollTrigger);

const Home = ({ data }) => {
  const animationRefs = useRef([]);
  const pushAnimateRef = (item) => animationRefs.current.push(item);

  // useEffect(() => {
  //   ScrollTrigger.batch(animationRefs.current, {
  //     once: true,
  //     onEnter: (elements) => {
  //       return gsap.fromTo(
  //         elements,
  //         {
  //           start: '0 top',
  //           end: 'top 0',
  //         },
  //         {
  //           translateY: '-60%',
  //           duration: 0.4,
  //           scrollTrigger: {
  //             trigger: elements,
  //             scrub: 4,
  //             start: '0 top',
  //             end: 'top -5%',
  //           },
  //         }
  //       );
  //     },
  //   });
  // }, []);

  return (
    <Animation targets={pushAnimateRef.current}>
      <Hero slideType="1" data={data} />
      <Overlay>
        <ScienceBased />
        <BenefitFrom />
      </Overlay>
      {/* <SectionService />
      <SmartfitApp />
      <Trainers />
      <Testimonials />
      <FaqSection />
      <Overlay>
        <PersonalTraining />
      </Overlay>
      <Comments />
      <ReferralProgram />
      <Listen /> */}
    </Animation>
  );
};

export const getServerSideProps = async () => {
  const data = await getIndexPageData(CONTENT_TYPE);

  return { props: { data: data[0].fields } };
};

export default Home;
