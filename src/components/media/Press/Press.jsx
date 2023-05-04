import Pagination from '../Pagination';
import MobilePagination from '../Pagination/MobilePagination';
import PressMainPost from '../Pinned/Press';
import PostsList from '../PostsList/PostsList';

import { useServePagination } from '@/hooks/useServePagination';
import { smoothScroll } from '@/helpers';

const PressView = ({ posts, count, pinned, pageSize = 15 }) => {
  const { currentPage, onPageChange } = useServePagination();

  const [pinnedPost] = pinned;
  const shouldHavePagination = count > pageSize;

  const onPageClick = (page) => {
    onPageChange(page);
    smoothScroll(650);
  };

  return (
    <>
      <PressMainPost post={pinnedPost} />

      <PostsList posts={posts} isImgCover={false} />

      {shouldHavePagination && (
        <>
          <Pagination
            totalCount={count}
            currentPage={currentPage}
            onPageChange={onPageClick}
            pageSize={pageSize}
          />
          <MobilePagination
            totalCount={count}
            currentPage={currentPage}
            onPageChange={onPageClick}
            pageSize={pageSize}
          />
        </>
      )}
    </>
  );
};

export default PressView;
