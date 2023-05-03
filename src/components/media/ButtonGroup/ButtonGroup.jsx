import { useState } from 'react';
import styles from './MediaBtnGroup.module.sass';

const BlogButtonGroup = () => {
  const [isBlogActive, setIsBlogActive] = useState(true);

  const toggleActive = () => setIsBlogActive(!isBlogActive);

  return (
    <div className={styles.wrapper}>
      <BlogButton isActive={isBlogActive} onClick={toggleActive}>
        Blog
      </BlogButton>
      <BlogButton isActive={!isBlogActive} onClick={toggleActive}>
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
