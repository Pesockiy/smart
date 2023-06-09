import Link from 'next/link';
import cx from 'class-names';

import Img from '@/common/Img/Img';
import Video from '@/common/Video/Video';
import ButtonVideo from '@/common/ButtonVideo/ButtonVideo';
import Button from '@/common/Button/Button';
import { PostChip } from '../../PostChip/PostChip';
import { formatPostDate, truncateTextByLength } from '@/helpers';
import styles from './PressPinned.module.sass';
import s from '../../Post.module.sass';

const isVideoPost = (post) => post.type === 'video';

const PressMainPost = ({ post }) => {
  const createdAt = formatPostDate(post.createdAt);
  const description = truncateTextByLength({
    text: post.description,
    length: 16,
  });
  const href = `/media/${post.id}`;

  return (
    <div className={styles.wrapper}>
      <div className={styles.imgWrapper}>
        <div className={styles.chipWrapper}>
          <PostChip type={post.type} />
        </div>

        <Preview post={post} />
      </div>

      <div className={styles.content}>
        <span className={s.createdAt}>{createdAt}</span>

        <Link href={href} className={s.titleLink}>
          {post.title}
        </Link>

        <p className={cx(s.description, styles.pressDescription)}>
          {description}
        </p>

        <InteractionButton post={post} />
      </div>
    </div>
  );
};

const InteractionButton = ({ post }) => {
  return isVideoPost(post) ? (
    <ButtonVideo>Watch video</ButtonVideo>
  ) : (
    <Button
      variant="base"
      className={styles.readMoreBtn}
      href={`/media/${post.id}`}
    >
      Read more
    </Button>
  );
};

const Preview = ({ post }) => {
  return isVideoPost(post) ? (
    <Video
      className={styles.videoWrapper}
      params={{
        muted: true,
        src: post.video,
      }}
    />
  ) : (
    <Img
      src={post.image}
      width={765}
      height={476}
      alt={'dfd'}
      className={styles.mainImage}
    />
  );
};

export default PressMainPost;
