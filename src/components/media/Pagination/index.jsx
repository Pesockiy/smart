import { getPaginationSteps } from '@/helpers';
import LeftButton from './common/LeftButton';
import RightButton from './common/RightButton';
import StepsList from './components/StepsList';
import styles from './Pagination.module.sass';

const Pagination = ({ pageSize, currentPage, totalCount, onPageChange }) => {
  const steps = getPaginationSteps({
    pageSize,
    totalCount,
    currentPage,
    siblingCount: 1, // NOTE: sibling from center;
  });

  const hasNoPrevPage = currentPage === 1;
  const hasNoNextPage = currentPage === Math.ceil(totalCount / pageSize);

  const onNextPageClick = () => onPageChange(currentPage + 1);
  const onPrevPageClick = () => onPageChange(currentPage - 1);

  return (
    <div className={styles.paginationWrapper}>
      <LeftButton disabled={hasNoPrevPage} onClick={onPrevPageClick} />

      <StepsList
        steps={steps}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />

      <RightButton disabled={hasNoNextPage} onClick={onNextPageClick} />
    </div>
  );
};

export default Pagination;
