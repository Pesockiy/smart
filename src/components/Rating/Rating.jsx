import cx from 'class-names';

import StarFill from '../../assets/icons/star-filled.svg';
import StarEmpty from '../../assets/icons/star-empty.svg';
import styles from './Rating.module.sass';

const RatingView = ({ rating, count = 5, size = 15 }) => {
  const width = (100 * rating) / 5;

  return (
    <div className={styles.wrapper}>
      <StarsList
        size={size}
        count={count}
        widthInPercentage={width}
        className={cx(styles.starList, styles.frontStarsList)}
      />

      <StarsList
        isEmpty
        widthInPercentage={100}
        size={size}
        count={count}
        className={cx(styles.starList)}
      />
    </div>
  );
};

const StarsList = ({ count, size, widthInPercentage = 0, isEmpty = false, className = '' }) => {
  return (
    <ul className={className} style={{ width: `${widthInPercentage}%` }}>
      {Array.from({ length: count }).map((_, idx) => (
        <li key={idx}>
          {isEmpty ? (
            <StarEmpty width={size} height={size} />
          ) : (
            <StarFill width={size} height={size} />
          )}
        </li>
      ))}
    </ul>
  );
};

export default RatingView;
