import { useRef, useEffect } from 'react';
import { getIndexPageData } from '@/contentful/pages';

import Hero from '@/components/Hero/Hero';
import ScienceBased from '@/components/ScienceBased/ScienceBased';
import BenefitFrom from '@/components/BenefitFrom/BenefitFrom';
import FaqSection from '@/components/FaqSection/FaqSection';
import Animation from '@/common/Animations/Animations';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
// import ScrollSmoother from "gsap"

import 'swiper/css';

import { CONTENT_TYPE } from '@/contentful/pages';

gsap.registerPlugin(ScrollTrigger);

const Home = ({ data }) => {
  const animationRefs = useRef([]);
  const animationInnerRefs = useRef([]);
  const pushAnimateRef = (item) => animationRefs.current.push(item);
  const pushAnimateInnerRef = (item) => animationInnerRefs.current.push(item);

  useEffect(() => {
    // ScrollSmoother.create({
    //   smooth: 1,               // how long (in seconds) it takes to "catch up" to the native scroll position
    //   effects: true,           // looks for data-speed and data-lag attributes on elements
    //   smoothTouch: 0.1,        // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
    // });
    // animationRefs.current.forEach((item, i, arr) => {
    //   gsap.fromTo(
    //     item,
    //     {
    //       opacity: 1,
    //       translateY: 0,
    //     },
    //     {
    //       opacity: 0,
    //       translateY: -arr[i + 1]?.offsetHeight,
    //       // translateY: -100 / (i + 1) + 'vh',
    //       duration: 0.4,
    //       scrollTrigger: {
    //         trigger: animationRefs.current[i],
    //         scrub: 2,
    //         start: '0 top',
    //         end: 'top 0',
    //       },
    //     }
    //   );
    // });
    ScrollTrigger.batch(animationRefs.current, {
      once: true,
      onEnter: (elements) => {
        console.log(elements[0].offsetHeight);
        return gsap.fromTo(elements,
          {
            // backgroundColor: "red",
            start: '0 top',
            end: 'top 0',
          },
          {
          // opacity: 0,
          // translateY: -arr[i + 1]?.offsetHeight,
          // translateY: -100 + 'vh',
          // translateY: -elements[0].offsetHeight,
          translateY: '-80%',
          duration: 0.4,
          scrollTrigger: {
            // toggleActions: "reverse, none, none, restart",
            trigger: elements,
            scrub: 2,
            start: '10% top',
            end: 'top -100%',
          },
        });
      },
    });
  }, []);

  return (
    <Animation targets={animationRefs.current}>
      <Hero ref={pushAnimateRef} data={data[0].fields} />
      <FaqSection ref={pushAnimateRef} />
      <ScienceBased ref={pushAnimateRef} />
      <BenefitFrom ref={pushAnimateRef} />
    </Animation>
  );
};

export const getServerSideProps = async () => {
  const data = await getIndexPageData(CONTENT_TYPE);

  return { props: { data } };
};

export default Home;
