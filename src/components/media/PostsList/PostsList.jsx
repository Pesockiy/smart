import Link from 'next/link';

import Img from '@/common/Img/Img';
import { formatPostDate, truncateTextByLength } from '@/helpers';
import styles from './PostsList.module.sass';

const PostsList = ({ posts }) => {
  if (posts.length === 0) return <div>No Posts yet.</div>;

  return (
    <ul className={styles.list}>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </ul>
  );
};

export const PostItem = ({ post }) => {
  const description = truncateTextByLength({
    text: post.description,
    length: 20,
  });

  const createdAt = formatPostDate(post.createdAt);

  return (
    <li className={styles.listItem}>
      <Img
        className={styles.image}
        src={post.image}
        width={427}
        height={276}
        alt={post.title}
      />

      <div className={styles.content}>
        <div className={styles.createdAt}>{createdAt}</div>

        <Link className={styles.titleLink} href={`/media/${post.id}`}>
          {post.title}
        </Link>
        <p>
          {description}{' '}
          <Link className={styles.readMoreLink} href={`/media/${post.id}`}>
            Read more
          </Link>
        </p>
      </div>
    </li>
  );
};

export default PostsList;
