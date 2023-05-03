import ArrowIcon from './ArrowIcon';
import styles from '../Pagination.module.sass';

const RightButton = ({ disabled, onClick }) => {
  return (
    <button
      className={styles.nextBtn}
      type="button"
      disabled={disabled}
      onClick={onClick}
    >
      Next <ArrowIcon className={styles.rightArrow} width={30} height={10} />
    </button>
  );
};

export default RightButton;
