import Link from 'next/link';
import cx from 'class-names';

import Img from '@/common/Img/Img';
import { formatPostDate, truncateTextByLength } from '@/helpers';
import styles from './BlogPinned.module.sass';
import s from '../../Post.module.sass';
import Heading from '@/common/Heading/Heading';

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
    <div className={styles.post}>
      <Img className={styles.image} src={post.image} width={874} height={429} alt={post.title} />

      <div className={styles.content}>
        <div className={s.createdAt}>{createdAt}</div>

        <div className={styles.postInfoWrapper}>
          <Heading as="h2" className={s.title}>
            <Link className={cx(s.titleLink, styles.mainTitleLink)} href={postPath}>
              {post.title}
            </Link>
          </Heading>

          <p className={s.description}>
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
      <div className={s.createdAt}>{createdAt}</div>

      <Heading as="h2" className={s.title}>
        <Link className={s.titleLink} href={`/media/${post.id}`}>
          {post.title}
        </Link>
      </Heading>
    </li>
  );
};

export default BlogPinned;
