import Container from '@/common/Container/Container';
import Heading from '@/common/Heading/Heading';
import Popular from '@/components/media/Popular/Popular';
import BlogButtonGroup from '@/components/media/ButtonGroup/ButtonGroup';
import MobilePagination from '@/components/media/Pagination/MobilePagination';
import Pagination from '@/components/media/Pagination';
import { useServePagination } from '@/hooks/useServePagination';
import styles from './Media.module.sass';
import PostsList from '@/components/media/PostsList/PostsList';
// FIXME: in case amount of posts less than LIMIT should not show pagination at all;
// TODO: move to constants
const DEFAULT_POSTS_LIMIT = 6;
const DEFAULT_POSTS_PAGE = 1;
const DEFAULT_POSTS_OFFSET = 0;

const Media = ({ posts, count, popular }) => {
  const { currentPage, onPageChange } = useServePagination();

  return (
    <Container className={styles.wrapper}>
      <header className={styles.blogHeader}>
        <Heading className={styles.title}>Media</Heading>
        <div className={styles.btnGroupWrapper}>
          <BlogButtonGroup />
        </div>
      </header>

      <Popular posts={popular.items} />

      <PostsList posts={posts} />

      <Pagination
        totalCount={count ?? 0}
        currentPage={currentPage}
        onPageChange={onPageChange}
        pageSize={DEFAULT_POSTS_LIMIT}
      />

      <MobilePagination
        totalCount={count ?? 0}
        currentPage={currentPage}
        onPageChange={onPageChange}
        pageSize={DEFAULT_POSTS_LIMIT}
      />
    </Container>
  );
};

export const getServerSideProps = async (context) => {
  const { query } = context;

  const page = Number(query.page) || 1;

  const params = new URLSearchParams({
    limit: DEFAULT_POSTS_LIMIT,
    offset: (page - DEFAULT_POSTS_PAGE) * DEFAULT_POSTS_LIMIT,
  });
  // TODO: promise.all for it
  const responsePopular = await fetch(
    `http://localhost:3000/api/posts/popular`
  );
  const resultPopular = await responsePopular.json();

  const response = await fetch(`http://localhost:3000/api/posts?${params}`);
  const result = await response.json();

  return {
    props: {
      posts: result.items,
      count: result.count,
      popular: {
        items: resultPopular.items,
      },
    },
  };
};

export default Media;
