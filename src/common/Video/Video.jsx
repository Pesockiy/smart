import React, { useEffect, useRef } from "react";
import cx from "class-names";

import { useVideo } from "@/hooks";

import ProgressBar from "../ProgressBar/ProgressBar";

import Play from "@/assets/icons/Play.svg";
import Pause from "@/assets/icons/Pause.svg";

import styles from "./Video.module.sass";

const Video = ({
  params = {},
  play = false,
  className = "",
  children = null,
  onEnd = () => {},
  onClick = () => {},
  buttonClassName = "",
  progressBar = false,
  showButtons = false,
}) => {
  const videoRef = useRef(null);
  const { isPlay, playToggler, isPlayed, progress } = useVideo(play, videoRef);
  const classes = cx(styles.videoWrap, className);

  useEffect(() => {
    if (isPlayed) {
      onEnd();
    }
  }, [isPlayed]);

  return (
    <div className={classes} onClick={onClick}>
      <video ref={videoRef} className={styles.video} {...params}></video>
      {children}
      {showButtons && (
        <div
          className={cx(styles.videoButton, buttonClassName)}
          onClick={playToggler}
        >
          {isPlay ? <Pause /> : <Play />}
        </div>
      )}
      {progressBar && (
        <ProgressBar progress={progress} className={styles.pvideProgress} />
      )}
    </div>
  );
};

export default Video;
