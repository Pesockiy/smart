import { useState, useEffect, useCallback } from "react";

const useVideo = (play = false, ref = null) => {
    const [isPlay, toggle] = useState(play);
    const [played, setPlayed] = useState(false);

    const playToggler = (val) => {
        if (val) {
            ref?.current?.pause();
            ref.current.currentTime = 0;
        } else {
            ref?.current?.play();
        }
    }

    const playHandler = useCallback(() => {
        toggle(prev => !prev);
        playToggler(isPlay)
    }, [isPlay, ref])

    useEffect(() => {
        // const timeout = setInterval(() => {
        //     // прописать проверку на обновление рефа и обнулять при этом таймаут
        //     // console.log(ref?.current?.currentTime == ref?.current?.duration);
        //     if (ref?.current?.duration === ref?.current?.currentTime) {
        //         toggle(false);
        //         setPlayed(() => true);
        //         clearInterval(timeout);
        //     };   
        // }, 1000);

        // return () => {
        //     clearInterval(timeout);
        // }
        ref.current.onended = () => {
            console.log('end');
            toggle(false);
            setPlayed(() => true);
        }
    }, [play, ref]);

    useEffect(() => {
        play && playHandler();
    }, [play, ref]);

    return { isPlay, playHandler, played }
}

export default useVideo;