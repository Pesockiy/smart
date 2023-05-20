import Link from 'next/link';
import cx from 'class-names';
import { useRouter } from 'next/router';

import Img from '@/common/Img/Img';
import Video from '@/common/Video/Video';
import { formatPostDate, truncateTextByLength } from '@/helpers';
import styles from './PostItem.module.sass';
import s from '../Post.module.sass';
import Heading from '@/common/Heading/Heading';
import { PostChip } from '../PostChip/PostChip';

const PostItem = ({ post, isImgCover, positionIdx = null, tag: RootTag = 'li' }) => {
  const router = useRouter();

  // const Tag = tag;

  const description = truncateTextByLength({
    text: post.description,
    length: 20,
  });
  const createdAt = formatPostDate(post.createdAt);
  const isDefaultType = post.type !== 'post';

  return (
    <RootTag className={styles.listItem}>
      {isDefaultType && (
        <div className={styles.chipWrapper}>
          <PostChip type={post.type} />
        </div>
      )}

      <Preview post={post} isImgCover={isImgCover} />

      <div className={styles.content}>
        <div className={s.createdAt}>{createdAt}</div>

        <Heading as="h2" className={s.title}>
          <Link
            className={s.titleLink}
            href={`/media/${post.id}`}
            state={{ positionIdx, id: post.id, page: router.query.page ?? 1 }}
          >
            {post.title}
          </Link>
        </Heading>

        <p className={s.description}>
          {description}{' '}
          <Link className={styles.readMoreLink} href={`/media/${post.id}`}>
            Read more
          </Link>
        </p>
      </div>
    </RootTag>
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
    <Img className={imgClasses} src={post.image} width={427} height={276} alt={post.title} />
  );
};

export default PostItem;
