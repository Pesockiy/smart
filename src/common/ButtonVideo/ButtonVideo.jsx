import cx from 'class-names';

import Button from '@/common/Button/Button';

import styles from './ButtonVideo.module.sass';

const ButtonVideo = ({ className, children }) => {
  const classes = cx(styles.buttonVideo, className);
  return (
    <Button base={true} className={classes}>
      {children} <PlayIcon />
    </Button>
  );
};

const PlayIcon = () => {
  return (
    <svg
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="10.8975" r="9" stroke="#FF5F28" strokeWidth="2" />
      <path
        d="M9.25 9.59598L11.5 10.895L9.25 12.1941L9.25 9.59598Z"
        fill="#FF5F28"
        stroke="#FF5F28"
        strokeWidth="2.5"
      />
    </svg>
  );
};

export default ButtonVideo;
