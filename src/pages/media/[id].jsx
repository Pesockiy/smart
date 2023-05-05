import { useEffect, useState } from 'react';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'next-share';
import Container from '@/common/Container/Container';
import { formatPostDate } from '@/helpers';
import DecorationDors from '@/assets/icons/decoration-dots.svg';
import { postMock } from '@/mock/blog/post';
import Img from '@/common/Img/Img';
import Video from '@/common/Video/Video';
import styles from './Post.module.sass';
import FaceBook from '../../assets/icons/facebook.svg';
import Instagram from '../../assets/icons/instagram.svg';
import LinkedIn from '../../assets/icons/linkedin.svg';
import WhatsUp from '../../assets/icons/whatsup.svg';
import Twitter from '../../assets/icons/twitter.svg';
import Copy from '../../assets/icons/copy.svg';
import { PostItem } from '@/components/media/PostsList/PostsList';
import { useCopy } from '@/hooks';

// TODO: read time;
// TODO: social media sharing;

const usePostInfiniteScroll = ({ initial }) => {
  const [currentPosts, setCurrentPosts] = useState(() => [initial.post]);
  const [nextPostMap, setNextPostMap] = useState(
    new Map([[initial.post.id, initial.next]])
  );

  useEffect(() => {
    let isLoading = false;

    const handleScroll = async () => {
      if (isLoading) return;

      const { scrollHeight, scrollTop, clientHeight } =
        document.documentElement;

      const SCROLL_PERCENTAGE = 0.99;

      if (scrollTop + clientHeight >= scrollHeight * SCROLL_PERCENTAGE) {
        isLoading = true;

        const lastPostId = currentPosts[currentPosts.length - 1].id;
        const response = await fetch(`/api/posts/${lastPostId}?offset=1`);
        const { post } = await response.json();

        setCurrentPosts((prev) => prev.concat(post.current));
        setNextPostMap((prevNextPostMap) => {
          return new Map([
            ...prevNextPostMap.entries(),
            [post.current.id, post.next],
          ]);
        });

        isLoading = false;
      }
    };

    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [currentPosts]);

  return [currentPosts, nextPostMap];
};

const PostView = ({ post }) => {
  const [currentPosts, nextPostMap] = usePostInfiniteScroll({
    initial: { post: post.current, next: post.next },
  });

  return (
    <>
      {currentPosts.map((item) => {
        return (
          <Post key={item.id} post={item} nextPost={nextPostMap.get(item.id)} />
        );
      })}
    </>
  );
};

const Post = ({ post, nextPost }) => {
  const createdAt = formatPostDate(post.createdAt);
  return (
    <Container>
      <header className={styles.postHeader}>
        <span className={styles.createdAt}>{createdAt}</span>

        <div className={styles.titleWrap}>
          <h1>{post.title}</h1>
          <p>ID: {post.id}</p>
        </div>

        <DecorationDors />
      </header>

      <ul className={styles.list}>
        {postMock.items.map((post) => (
          <li key={post.id}>
            {post.type === 'big-image' && (
              <Img
                className={styles.bigImg}
                src={post.image}
                width={1320}
                height={700}
                alt="Smart fit"
              />
            )}

            {post.type === 'info' && (
              <div className={styles.smallContainer}>
                <h2 className={styles.infoTitle}>{post.title}</h2>

                {post.description.map((description, idx) => (
                  <p key={idx} className={styles.infoDescription}>
                    {description}
                  </p>
                ))}

                {post.video && post.video !== null && (
                  <VideoPreview src={post.video} />
                )}
              </div>
            )}
          </li>
        ))}
      </ul>

      <div className={styles.smallContainer}>
        <SocialNetworksSharing post={post} />

        <div className={styles.nextPostContainer}>
          <h3 className={styles.infoTitle}>Next Post</h3>
          <PostItem post={nextPost} isImgCover />
        </div>
      </div>
    </Container>
  );
};

const SocialNetworksSharing = ({ post }) => {
  const { onCopy } = useCopy();

  const url = `http://localhost:3000/media/${post.id}`;
  // FIXME: instagram does not work;
  return (
    <div className={styles.socialWrapper}>
      <span>Share:</span>

      <ul className={styles.socialList}>
        <li>
          <button type="button" className={styles.socialIcon}>
            <Instagram />
          </button>
        </li>

        <li>
          <FacebookShareButton
            url={url}
            title={post.title}
            quote={post.description}
          >
            <FaceBook className={styles.socialIcon} />
          </FacebookShareButton>
        </li>

        <li>
          <TwitterShareButton
            url={url}
            title={post.title}
            quote={post.description}
          >
            <Twitter className={styles.socialIcon} />
          </TwitterShareButton>
        </li>

        <li>
          <LinkedinShareButton
            url={url}
            title={post.title}
            quote={post.description}
          >
            <LinkedIn className={styles.socialIcon} />
          </LinkedinShareButton>
        </li>

        <li>
          <WhatsappShareButton
            className={styles.socialIcon}
            url={url}
            title={post.title}
            quote={post.description}
          >
            <WhatsUp className={styles.socialIcon} />
          </WhatsappShareButton>
        </li>

        <li>
          <button type="button" onClick={() => onCopy(url)}>
            <Copy className={styles.socialIcon} />
          </button>
        </li>
      </ul>
    </div>
  );
};

const VideoPreview = ({ src }) => {
  return (
    <Video
      showButtons
      className={styles.videoWrapper}
      params={{
        src,
        muted: true,
      }}
    />
  );
};

export const getServerSideProps = async (context) => {
  const response = await fetch(
    `http://localhost:3000/api/posts/${context.query.id}`
  );
  const result = await response.json();

  return {
    props: {
      post: {
        current: result.post,
        next: result.next,
      },
    },
  };
};

export default PostView;
