import cx from 'class-names';

import styles from './MediaBtnGroup.module.sass';

const BlogButtonGroup = ({
  onClick,
  options,
  wrapperClassName = '',
  defaultOption = null,
}) => {
  const className = cx(styles.wrapper, wrapperClassName);

  return (
    <div className={className}>
      {options.map((option) => {
        const isActive = defaultOption.value === option.value;

        return (
          <BlogButton isActive={isActive} onClick={() => onClick(option)}>
            {option.label}
          </BlogButton>
        );
      })}
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
