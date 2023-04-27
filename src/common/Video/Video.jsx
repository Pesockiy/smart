import React, { forwardRef, useEffect } from "react";
import cx from "class-names";

import styles from "./Video.module.sass";

import Play from "@/assets/icons/Play.svg";
import Pause from "@/assets/icons/Pause.svg";

import { useVideo } from "@/hooks";

const Video = forwardRef(
  (
    {
      play = false,
      className = "",
      params = {},
      children,
      onEnd = () => {},
      onClick = () => {},
    },
    ref
  ) => {
    const { isPlay, playHandler, played } = useVideo(play, ref);

    const classes = cx(styles.videoWrap, className);

    const clickHandler = () => {
      playHandler();
      onClick();
    };

    useEffect(() => {
      // console.log(played);
      if (played) {
        onEnd();
      }
    }, [played]);

    return (
      <div className={classes} onClick={onClick}>
        <video ref={ref} className={styles.video} {...params}></video>
        {children}
        <div className={styles.videoButton} onClick={clickHandler}>
          {isPlay ? <Pause /> : <Play />}
        </div>
      </div>
    );
  }
);

export default Video;
