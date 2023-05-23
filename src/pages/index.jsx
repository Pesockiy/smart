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
import SectionMedia from '@/components/SectionMedia/SectionMedia';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import { CONTENT_TYPE } from '@/contentful/pages';

import { Posts } from './media';

gsap.registerPlugin(ScrollTrigger);

const Home = ({ data, posts }) => {
  return (
    <>
      <Hero slideType="1" data={data} />
      <Overlay>
        <ScienceBased />
        <BenefitFrom />
      </Overlay>
      <SectionService />
      <SmartfitApp />
      <Trainers />
      <Testimonials />
      <FaqSection />
      <Overlay>
        <PersonalTraining />
      </Overlay>
      <Comments />
      <ReferralProgram />
      {/* <SectionMedia posts={posts} /> */}
      <Listen />
    </>
  );
};


export const getServerSideProps = async () => {
  const data = await getIndexPageData(CONTENT_TYPE);

  // const response = await Promise.all([Posts.get({ limit: 10 })]);

  // const [posts] = await Promise.all(response.map((res) => res.json()));

  return { props: { data: data[0].fields } };
  // return { props: { data: data[0].fields, posts: posts.items } };
};

export default Home;
