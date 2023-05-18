import { useEffect, useRef, useState } from 'react';

const useTimer = ({ seconds }) => {
  const intervalRef = useRef();
  const [sec, setSec] = useState(seconds);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const onStart = () => {
    if (intervalRef.current || seconds === 0) {
      clearInterval(intervalRef.current);
    }

    setSec(seconds);

    intervalRef.current = setInterval(() => {
      setSec((prev) => (prev !== 0 ? prev - 1 : 0));
    }, 1000);
  };

  const onStop = () => {
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
    }
  };

  return { seconds: sec, onStart, onStop };
};

export default useTimer;
