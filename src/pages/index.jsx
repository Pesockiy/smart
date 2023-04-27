import React, { useRef, useEffect, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import Hero from "@/components/Hero/Hero";
import ScienceBased from "@/components/ScienceBased/ScienceBased";

import "swiper/css";

const Home = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    gsap.fromTo(
      ref1.current,
      {
        translateY: 0,
      },
      {
        translateY: "-90vh",
        duration: 1,
        scrollTrigger: {
          trigger: ref2.current,
          start: "10 top",
          end: "top 10",
          scrub: 0.8,
          pin: false,
        },
      }
    );
  }, []);

  return (
    <div className="outer">
      <div ref={ref2}>
        <div ref={ref1} className="inner">
          <Hero slider/>
          <Hero bigMedia={true} wrapper rtl={true} />
          {/* <Hero bigMedia={true} wrapper/> */}
          {/* <ScienceBased /> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
