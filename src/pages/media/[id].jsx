import Container from '@/common/Container/Container';
import Img from '@/common/Img/Img';
import Video from '@/common/Video/Video';
import SocialSharing from '@/components/media/SocialSharing/SocialSharing';
import PostItem from '@/components/media/PostItem/PostItem';
import { formatPostDate } from '@/helpers';
import DecorationDors from '@/assets/icons/decoration-dots.svg';
import { postMock } from '@/mock/blog/post';
import { usePostInfiniteScroll } from '@/hooks';
import styles from './PostPage.module.sass';
import Text from '@/common/Text/Text';
import Heading from '@/common/Heading/Heading';
import calculateReadTime from '@/helpers/calculateReadTime';

// TODO: read time;

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

  const text = postMock.items
    .filter((item) => item.type === 'info')
    .map((desc) => desc.description)
    .flat(1)
    .join(' ');

  const readTime = calculateReadTime({ text, wordsPerMinute: 200 });
  const readTimeText =
    readTime > 1 ? `${readTime} min read` : 'less than 1 min read';

  return (
    <Container>
      <header className={styles.header}>
        <div className={styles.info}>
          <span>{createdAt}</span>
          <span className={styles.dotDivider}></span>
          <span>{readTimeText}</span>
        </div>

        <div className={styles.titleWrap}>
          <Heading>
            <Text as="span" gradient>
              {post.title}
            </Text>
          </Heading>
          <p>ID: {post.id}</p>
        </div>

        <DecorationDors className={styles.dots} />
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
        <SocialSharing post={post} />

        <div className={styles.nextPostContainer}>
          <h3 className={styles.infoTitle}>Next Post</h3>
          <PostItem post={nextPost} isImgCover />
        </div>
      </div>
    </Container>
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
