import Link from 'next/link';
import cx from 'class-names';

import Img from '@/common/Img/Img';
import { PostChip } from '../PostChip/PostChip';
import Video from '@/common/Video/Video';
import { formatPostDate, truncateTextByLength } from '@/helpers';
import styles from './PostsList.module.sass';
import { useRouter } from 'next/router';

const PostsList = ({ posts, isImgCover = true }) => {
  if (posts.length === 0) return <div>No Posts yet.</div>;

  return (
    <ul className={styles.list}>
      {posts.map((post, idx) => (
        <PostItem
          key={post.id}
          post={post}
          isImgCover={isImgCover}
          positionIdx={idx}
        />
      ))}
    </ul>
  );
};

export const PostItem = ({ post, isImgCover, positionIdx = null }) => {
  const router = useRouter();

  const description = truncateTextByLength({
    text: post.description,
    length: 20,
  });
  const createdAt = formatPostDate(post.createdAt);
  const isDefaultType = post.type !== 'post';

  return (
    <li className={styles.listItem}>
      {isDefaultType && (
        <div className={styles.chip}>
          <PostChip type={post.type} />
        </div>
      )}

      <Preview post={post} isImgCover={isImgCover} />

      <div className={styles.content}>
        <div className={styles.createdAt}>{createdAt}</div>

        <Link
          className={styles.titleLink}
          href={`/media/${post.id}`}
          state={{ positionIdx, id: post.id, page: router.query.page ?? 1 }}
        >
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

const Preview = ({ post, isImgCover }) => {
  const isVideo = post.type === 'video';

  const imgClasses = cx(styles.image, {
    [styles.cover]: isImgCover,
    [styles.scaleDown]: !isImgCover,
  });

  return isVideo ? (
    <Video
      showButtons
      className={styles.videoWrapper}
      params={{
        muted: true,
        src: post.video,
      }}
    />
  ) : (
    <Img
      className={imgClasses}
      src={post.image}
      width={427}
      height={276}
      alt={post.title}
    />
  );
};

export default PostsList;
