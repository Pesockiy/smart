import { useState, useEffect } from 'react';

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  });

  function handleResize() {
    setWindowDimensions(getWindowDimensions());
  }

  useEffect(() => {
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
};
