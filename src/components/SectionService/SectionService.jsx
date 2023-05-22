import { forwardRef, useRef, useEffect } from 'react';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import SectionContainer from '@/components/SectionContainer/SectionContainer';
import Animation from '@/common/Animations/Animations';
import Video from '@/common/Video/Video';
import Img from '@/common/Img/Img';
import Text from '@/common/Text/Text';
import Heading from '@/common/Heading/Heading';
import ButtonVideo from '@/common/ButtonVideo/ButtonVideo';
import Chip from '@/common/Chip/Chip';

import styles from './SectionService.module.sass';

const data = [
  {
    media: {
      topImg: '/images/services/phone-1.png',
      bottomImg: '/images/services/instrument-1.png',
      video: '/videos/1.mp4',
    },
    texts: {
      title: 'Smart BodyScan',
      text: 'The Fit3D 3D Body Scanner safely, privately, and accurately allows your members to capture and track valuable data on their way to reaching their wellness and body shape goals.',
      info: [
        {
          title: '3',
          label: 'm+',
          text: '3D body scans',
        },
        {
          title: '3.5',
          label: 'k',
          text: '3D body scanners deployed',
        },
      ],
    },
  },
  {
    media: {
      topImg: '/images/services/phone-2.png',
      bottomImg: '/images/services/instrument-2.png',
      video: '/videos/2.mp4',
    },
    texts: {
      title: 'Smart BodyScan',
      text: 'The Fit3D 3D Body Scanner safely, privately, and accurately allows your members to capture and track valuable data on their way to reaching their wellness and body shape goals.',
      info: [
        {
          title: '3',
          label: 'm+',
          text: '3D body scans',
        },
        {
          title: '3.5',
          label: 'k',
          text: '3D body scanners deployed',
        },
      ],
    },
  },
  {
    media: {
      topImg: '/images/services/phone-3.png',
      bottomImg: '/images/services/instrument-3.png',
      video: '/videos/3.mp4',
    },
    texts: {
      title: 'Smart BodyScan',
      text: 'The Fit3D 3D Body Scanner safely, privately, and accurately allows your members to capture and track valuable data on their way to reaching their wellness and body shape goals.',
      info: [
        {
          title: '3',
          label: 'm+',
          text: '3D body scans',
        },
        {
          title: '3.5',
          label: 'k',
          text: '3D body scanners deployed',
        },
      ],
    },
  },
  {
    media: {
      topImg: '/images/services/phone-4.png',
      bottomImg: '/images/services/instrument-4.png',
      video: '/videos/4.mp4',
    },
    texts: {
      title: 'Smart BodyScan',
      text: 'The Fit3D 3D Body Scanner safely, privately, and accurately allows your members to capture and track valuable data on their way to reaching their wellness and body shape goals.',
      info: [
        {
          title: '3',
          label: 'm+',
          text: '3D body scans',
        },
        {
          title: '3.5',
          label: 'k',
          text: '3D body scanners deployed',
        },
      ],
    },
  },
  {
    media: {
      bottomImg: '/images/services/instrument-5.png',
      video: '/videos/5.mp4',
    },
    texts: {
      title: 'Smart BodyScan',
      text: 'The Fit3D 3D Body Scanner safely, privately, and accurately allows your members to capture and track valuable data on their way to reaching their wellness and body shape goals.',
      info: [
        {
          title: '3',
          label: 'm+',
          text: '3D body scans',
        },
        {
          title: '3.5',
          label: 'k',
          text: '3D body scanners deployed',
        },
      ],
    },
  },
];

const SectionService = forwardRef(({}, ref) => {
  const animationRefs = useRef([]);
  const sectionRef = useRef(null);
  const mainRef = useRef(null);

  const testRef = useRef([]);
  const testRef1 = useRef([]);

  useEffect(() => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: mainRef.current,
        scrub: 0.1,
        stagger: 20,
        snap: 0.1 / (animationRefs.current.length - 1),
        end: `+=${600 * animationRefs.current.length}`,
        duration: 1,
        start: 'bottom bottom',
        // markers: true,
      },
    });
    tl.to(animationRefs.current, {
      yPercent: -100 * (animationRefs.current.length - 1),
    });
    tl.set(
      animationRefs.current,
      {
        stagger: 0.05 / animationRefs.current.length,
      },
      0
    );
  }, []);

  const pushAnimateInnerRef = (item) => animationRefs.current.push(item);
  const pushTestRef = (item) => testRef.current.push(item);
  const pushTestRef1 = (item) => testRef1.current.push(item);

  return (
    <SectionContainer
      ref={mainRef}
      subtitle={'Services'}
      count="3"
      containerClassName={styles.sectionService}
    >
      <div className={styles.sectionServiceInner} ref={sectionRef}>
        <Animation targets={animationRefs.current}>
          {data.map((elem) => (
            <div
              className={styles.sectionServiceContent}
              ref={pushAnimateInnerRef}
              key={elem.topImg}
            >
              <div className={styles.sectionServiceMediaBlock}>
                <div className={styles.sectionServiceVideoWrap}>
                  {elem?.media?.topImg && (
                    <>
                      <Img
                        src={elem?.media?.topImg}
                        alt=""
                        width={140}
                        height={290}
                        className={styles.img1}
                        priority
                        ref={pushTestRef}
                      />
                      <Chip ref={pushTestRef} label="Video" className={styles.chip} />
                    </>
                  )}
                  {elem?.media?.bottomImg && (
                    <div className={styles.img2} ref={pushTestRef}>
                      <Img
                        src={elem?.media?.bottomImg}
                        alt=""
                        width={140}
                        height={290}
                        className={styles.img}
                        priority
                      />
                    </div>
                  )}
                  <Video
                    showButtons
                    className={styles.video}
                    ref={pushTestRef}
                    params={{
                      muted: true,
                      src: data[0]?.media?.video,
                    }}
                  />
                </div>
              </div>
              <div className={styles.sectionServiceTextBlock}>
                <Heading ref={pushTestRef1}>
                  <Text gradient className={styles.sectionServiceText}>
                    {elem?.texts?.title.split(' ')[0]}
                  </Text>
                  {elem?.texts?.title.split(' ')[1]}
                </Heading>
                <Text ref={pushTestRef1} className={styles.text}>
                  {elem?.texts?.text}
                </Text>
                <ButtonVideo ref={pushTestRef1} className={styles.button}>
                  Watch video
                </ButtonVideo>

                <div className={styles.infoItems}>
                  {elem?.texts?.info?.map(({ title, label, text }) => (
                    <div className={styles.info} ref={pushTestRef1}>
                      <Heading className={styles.infoTitle} as="h3" size="lg">
                        {title}
                        <span className={styles.infoTitle}>{label}</span>
                      </Heading>
                      <Text className={styles.infoText}>{text}</Text>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </Animation>
      </div>
    </SectionContainer>
  );
});

export default SectionService;
