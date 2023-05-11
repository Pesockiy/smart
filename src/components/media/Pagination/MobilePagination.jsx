import { getPaginationSteps } from '@/helpers';
import LeftButton from './common/LeftButton';
import RightButton from './common/RightButton';
import StepsList from './components/StepsList';
import styles from './Pagination.module.sass';

const MobilePagination = ({
  pageSize,
  currentPage,
  totalCount,
  onPageChange,
}) => {
  const steps = getPaginationSteps({
    pageSize,
    totalCount,
    currentPage,
    siblingCount: 1, // NOTE: sibling from center;
    visibleItemCount: 3,
  });

  const hasNoPrevPage = currentPage === 1;
  const hasNoNextPage = currentPage === Math.ceil(totalCount / pageSize);

  const onNextPageClick = () => onPageChange(currentPage + 1);
  const onPrevPageClick = () => onPageChange(currentPage - 1);

  return (
    <div className={styles.mobilePagination}>
      <StepsList
        steps={steps}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
      <div className={styles.leftRightBtnWrapper}>
        <LeftButton disabled={hasNoPrevPage} onClick={onPrevPageClick} />
        <RightButton disabled={hasNoNextPage} onClick={onNextPageClick} />
      </div>
    </div>
  );
};

export default MobilePagination;
