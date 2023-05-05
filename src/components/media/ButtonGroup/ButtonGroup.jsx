import { useRef, useState } from 'react';

import styles from './MediaBtnGroup.module.sass';
// FIXME: should be customizable;
const BlogButtonGroup = ({ onClick, defaultIsBlogActive = true }) => {
  const [isBlogActive, setIsBlogActive] = useState(defaultIsBlogActive);
  const lastClickedRef = useRef(null);

  const toggleActive = (isActive) => {
    if (lastClickedRef.current !== isActive) {
      setIsBlogActive(isActive);
      onClick(isActive);
      lastClickedRef.current = isActive;
    }
  };

  return (
    <div className={styles.wrapper}>
      <BlogButton isActive={isBlogActive} onClick={() => toggleActive(true)}>
        Blog
      </BlogButton>
      <BlogButton isActive={!isBlogActive} onClick={() => toggleActive(false)}>
        Press
      </BlogButton>
    </div>
  );
};

const BlogButton = ({ children, isActive, onClick }) => (
  <button
    type="button"
    className={isActive ? styles.active : ''}
    onClick={onClick}
  >
    {children}
  </button>
);

export default BlogButtonGroup;
