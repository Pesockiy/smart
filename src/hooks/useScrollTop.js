import { useState, useEffect } from "react";

const useOffsetTop = (val = 300) => {
  const [isVisible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;

    if (scrolled > val) {
      setVisible(true);
    } else if (scrolled <= val) {
      setVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);

    return () => {
      window.removeEventListener("scroll", toggleVisible);
    };
  }, []);

  return [isVisible];
};

export default useOffsetTop;
