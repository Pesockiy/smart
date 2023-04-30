import cx from "class-names";

import Button from "@/common/Button/Button";

import IconPlayFill from "@/assets/icons/PlayFill.svg";

import styles from "./ButtonVideo.module.sass";

const ButtonVideo = ({ className, children }) => {
  const classes = cx(styles.buttonVideo, className);
  return (
    <Button base={true} className={classes}>
      {children} <IconPlayFill />
    </Button>
  );
};
export default ButtonVideo;
