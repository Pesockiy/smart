import React, { useEffect, useRef, forwardRef } from 'react';
import cx from 'class-names';

import { useVideo } from '@/hooks';

import ProgressBar from '@/common/ProgressBar/ProgressBar';

import IconPlay from '@/assets/icons/Play.svg';
import IconPause from '@/assets/icons/Pause.svg';

import styles from './Video.module.sass';

const Video = forwardRef(
  (
    {
      params,
      play,
      className,
      children,
      onClick,
      buttonClassName,
      progressBar,
      showButtons,
      onEnd,
    },
    ref
  ) => {
    const videoRef = useRef(null);
    const { isPlay, playToggler, isPlayed, progress } = useVideo(play, videoRef);
    const classes = cx(styles.videoWrap, className);

    useEffect(() => {
      if (isPlayed && onEnd) {
        onEnd();
      }
    }, [isPlayed]);

    return (
      <div ref={ref} className={classes} onClick={onClick}>
        <video ref={videoRef} className={styles.video} {...params}></video>
        {children}
        {showButtons && (
          <div className={cx(styles.videoButton, buttonClassName)} onClick={playToggler}>
            {isPlay ? <IconPause /> : <IconPlay />}
          </div>
        )}
        {progressBar && <ProgressBar progress={progress} className={styles.pvideProgress} />}
      </div>
    );
  }
);

export default Video;
