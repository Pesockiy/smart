import Text from '@/common/Text/Text';
import styles from './PlaceNotFound.module.sass';

const PlaceNotFound = ({ name }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.innerWrapper}>
        <NotFoundMarker />
        <Text className={styles.text}>
          {`We have not found any studios named "${name}".`}
        </Text>
        <Text className={styles.text}>Please change your search.</Text>
      </div>
    </div>
  );
};

const NotFoundMarker = () => {
  return (
    <svg
      width="65"
      height="64"
      viewBox="0 0 65 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M32.4997 55.999C29.3037 55.999 12.501 42.3947 12.501 28.1678C12.501 17.0301 21.4532 7.99902 32.4997 7.99902C43.5461 7.99902 52.501 17.0301 52.501 28.1678C52.501 42.3947 35.6956 55.999 32.4997 55.999Z"
        fill="url(#paint0_linear_488_154599)"
      />
      <path
        d="M34.1547 26.7735L27.1882 34.4628L32.613 40.2608L34.7173 33.1011H19.6992L30.9204 22.332L39.5087 28.2874L28.177 24.9649L26.5074 31.2989L40.2609 43.834L34.1547 26.7735Z"
        stroke="white"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle
        cx="35.3181"
        cy="19.0036"
        r="2.20362"
        stroke="white"
        strokeWidth="1.6"
      />
      <circle cx="28.2056" cy="24.9497" r="0.187982" fill="white" />
      <circle cx="34.1372" cy="26.7368" r="0.187982" fill="white" />
      <circle cx="28.4536" cy="33.0942" r="0.187982" fill="white" />
      <circle cx="33.4145" cy="37.6118" r="0.187982" fill="white" />
      <defs>
        <linearGradient
          id="paint0_linear_488_154599"
          x1="31.8343"
          y1="6.13132"
          x2="32.3053"
          y2="56.0009"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8A8787" stopOpacity="0.2" />
          <stop offset="0.499564" stopColor="#4B4E5B" stopOpacity="0.3" />
          <stop offset="1" stopColor="#6D6E71" stopOpacity="0.2" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default PlaceNotFound;
