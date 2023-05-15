import cx from 'class-names';

import { getPaginationSteps } from '@/helpers';
import LeftButton from './common/LeftButton';
import RightButton from './common/RightButton';
import StepsList from './components/StepsList';
import styles from './Pagination.module.sass';
import { useWindowDimensions } from '@/hooks';

const Pagination = ({ pageSize, currentPage, totalCount, onPageChange, className = '' }) => {
  const size = useWindowDimensions();
  const steps = getPaginationSteps({
    pageSize,
    totalCount,
    currentPage,
    visibleItemCount: size.width < 544 ? 3 : 5,
    siblingCount: 1, // NOTE: sibling from center;
  });

  const hasNoPrevPage = currentPage === 1;
  const hasNoNextPage = currentPage === Math.ceil(totalCount / pageSize);

  const onNextPageClick = () => onPageChange(currentPage + 1);
  const onPrevPageClick = () => onPageChange(currentPage - 1);

  const classes = cx(styles.paginationWrapper, { [className]: !!className });

  return (
    <div className={classes}>
      <LeftButton disabled={hasNoPrevPage} onClick={onPrevPageClick} />

      <StepsList steps={steps} currentPage={currentPage} onPageChange={onPageChange} />

      <RightButton disabled={hasNoNextPage} onClick={onNextPageClick} />
    </div>
  );
};

export default Pagination;
