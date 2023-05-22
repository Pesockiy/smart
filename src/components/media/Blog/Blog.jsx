import Pagination from '../Pagination';
import BlogPinned from '../Pinned/Blog';
import PostsList from '../PostsList/PostsList';

import styles from './Blog.module.sass';
import { smoothScroll } from '@/helpers';
import { useServePagination } from '@/hooks/useServePagination';

const BlogView = ({ pinned, posts, pageSize = 6, count = 0 }) => {
  const { currentPage, onPageChange } = useServePagination();

  const shouldHavePagination = count > pageSize;

  const onPageClick = (page) => {
    onPageChange(page);
    smoothScroll(700);
  };

  return (
    <>
      <BlogPinned posts={pinned.items} />

      <PostsList posts={posts} />

      {shouldHavePagination && (
        <>
          <Pagination
            className={styles.paginationWrapper}
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

export default BlogView;
