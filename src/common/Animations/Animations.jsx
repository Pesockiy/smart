import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Animation = ({
  children,
  scrub,
  start,
  end,
  targets = null,
  stagger = 0.05,
  delay = 0.1,
  duration = 0.5,
  ease = 'power4',
  toX = false,
  startY = 40,
  startX = 40,
  toggleActions = '',
}) => {

  useEffect(() => {
    if (targets?.length) {
      gsap.set(targets, {
        scrollTrigger: {
          toggleActions,
        },
        opacity: 0,
        y: toX ? 0 : startY,
        x: toX ? startX : 0,
      });
    }
  }, []);

  useEffect(() => {
    ScrollTrigger.batch(targets, {
      onEnter: (elements) =>
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          x: 0,
          duration,
          delay,
          stagger,
          ease,
          scrub,
          start,
          end,
        }),
    });
  }, []);

  return <>{children}</>;
};

export default Animation;
