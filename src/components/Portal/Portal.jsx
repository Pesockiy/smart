import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ children, className = '', container = null }) => {
  const ref = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const portalContainer = container || document.createElement('div');
    portalContainer.className = className;
    document.body.append(portalContainer);
    ref.current = portalContainer;

    setMounted(true);

    return () => {
      portalContainer.remove();
    };
  }, []);

  return mounted && ref.current ? createPortal(children, ref.current) : null;
};

export default Portal;
