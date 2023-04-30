import { useState, useEffect, useCallback } from "react";

import { getProgress } from "@/utilits/variables";

const useVideo = (play = false, ref = null) => {
    const [isPlay, setIsPlay] = useState(play);
    const [isPlayed, setIsPlayed] = useState(false);
    const [progress, setProgress] = useState(0);

    const playToggler = useCallback(() => {
        if (isPlay) {
            setIsPlay(prev => !prev);
            ref.current.pause();
            ref.current.currentTime = 0;
        } else {
            setIsPlay(prev => !prev);
            ref.current.play();
        }
    }, [ref, isPlay]);

    useEffect(() => {
        play && playToggler();

        ref.current.ontimeupdate = () => {
            setProgress(getProgress(ref.current?.currentTime, ref.current?.duration));
        }

        ref.current.onended = () => {
            setIsPlay(prev => !prev);
            setIsPlayed(true);
        }

        return () => {
            if (ref.current) {
                ref.current?.pause();
                (ref.current.currentTime = 0);
            }
            setIsPlay(false);
        }
    }, [play]);

    return { isPlay, playToggler, isPlayed, progress }
}

export default useVideo;