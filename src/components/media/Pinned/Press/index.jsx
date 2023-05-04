import { useRef } from 'react';
import Link from 'next/link';

import Img from '@/common/Img/Img';
import Video from '@/common/Video/Video';
import { formatPostDate, truncateTextByLength } from '@/helpers';
import { PostChip } from '../../PostChip/PostChip';
import styles from './PressPinned.module.sass';

const PressMainPost = ({ post }) => {
  const playerRef = useRef(null);

  const createdAt = formatPostDate(post.createdAt);
  const description = truncateTextByLength({
    text: post.description,
    length: 16,
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.imgWrapper}>
        <div className={styles.chipWrapper}>
          <PostChip type={post.type} />
        </div>

        {/* <Preview post={post} /> */}

        <Video
          showButtons
          className={styles.videoWrapper}
          ref={playerRef}
          params={{
            muted: true,
            src: '/videos/1.mp4',
          }}
        />
      </div>

      <div className={styles.content}>
        <span className={styles.createdAt}>{createdAt}</span>

        <Link href={`/media/${post.id}`} className={styles.titleLink}>
          {post.title}
        </Link>

        <p>{description}</p>

        <button type="button" className={styles.readMoreBtn}>
          Read more
        </button>
      </div>
    </div>
  );
};

const Preview = ({ post }) => {
  const playerRef = useRef(null);

  const isVideo = post.type === 'video';

  return isVideo ? (
    <Video
      showButtons
      className={styles.videoWrapper}
      ref={playerRef}
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
      className={styles.mainImage}
    />
  );
};

export default PressMainPost;
