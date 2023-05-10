import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Animation = ({ stagger = 0.05, duration = 0.5, children = null }) => {
  useEffect(() => {
    const targets = document.querySelectorAll("section div");

    if (targets.length) {
      gsap.set(targets, {
        opacity: 0,
        y: 40,
      });
    }
  }, [children]);

  useEffect(() => {
    const targets = document.querySelectorAll("section div");

    ScrollTrigger.batch(targets, {
      start: "top bottom",
      end: "+=100%",
      onEnter: (elements) =>
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          ease: "power2.out",
        }),
      once: false,
    });
  }, []);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [children]);

  return <>{children}</>;
};

export default Animation;
