import ArrowIcon from './ArrowIcon';
import styles from '../Pagination.module.sass';

const LeftButton = ({ disabled, onClick }) => {
  return (
    <button
      type="button"
      className={styles.prevBtn}
      disabled={disabled}
      onClick={onClick}
    >
      <ArrowIcon className={styles.leftArrow} width={30} height={10} /> Previous
    </button>
  );
};

export default LeftButton;
