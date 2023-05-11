import Link from 'next/link';

import Img from '@/common/Img/Img';
import { formatPostDate, truncateTextByLength } from '@/helpers';
import styles from './BlogPinned.module.sass';

const BlogPinned = ({ posts }) => {
  const [mainPost] = posts;

  return (
    <div className={styles.wrapper}>
      <BlogMainPost post={mainPost} />
      <BlogPinnedPostsList posts={posts.slice(1, posts.length)} />
    </div>
  );
};

const BlogMainPost = ({ post }) => {
  const description = truncateTextByLength({
    text: post.description,
    length: 17,
  });

  const createdAt = formatPostDate(post.createdAt);
  const postPath = `/media/${post.id}`;

  return (
    <div className={styles.mainPost}>
      <Img
        className={styles.postImage}
        src={post.image}
        width={874}
        height={429}
        alt={post.title}
      />

      <div className={styles.mainPostContent}>
        <div className={styles.createdAt}>{createdAt}</div>

        <div className={styles.postInfoWrapper}>
          <Link className={styles.mainTitleLink} href={postPath}>
            {post.title}
          </Link>
          <p>
            {description}{' '}
            <Link className={styles.readMoreLink} href={postPath}>
              Read more
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const BlogPinnedPostsList = ({ posts }) => {
  return (
    <ul className={styles.list}>
      {posts.map((post) => (
        <BlogPinnedPostItem key={post.id} post={post} />
      ))}
    </ul>
  );
};

const BlogPinnedPostItem = ({ post }) => {
  const createdAt = formatPostDate(post.createdAt);

  return (
    <li key={post.id} className={styles.listItem}>
      <div className={styles.createdAt}>{createdAt}</div>
      <Link className={styles.titleLink} href={`/media/${post.id}`}>
        {post.title}
      </Link>
    </li>
  );
};

export default BlogPinned;
