import { useEffect, useLayoutEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Container from '@/common/Container/Container';
import Heading from '@/common/Heading/Heading';
import BlogButtonGroup from '@/components/media/ButtonGroup/ButtonGroup';
import PressView from '@/components/media/Press/Press';
import BlogView from '@/components/media/Blog/Blog';
import styles from './Media.module.sass';
import { useIsMounted } from '@/hooks';

// FIXME: alternative font

const DEFAULT_POSTS_LIMIT = 6;
const DEFAULT_PRESS_LIMIT = 15;
const DEFAULT_PAGE = 1;
const MEDIA_TYPES = {
  blog: 'blog',
  press: 'press',
};

const Media = ({ posts, count, pinned, type }) => {
  const router = useRouter();
  const isMounted = useIsMounted();

  const isBlogType =
    router.query.type === MEDIA_TYPES.blog || router.query.type === undefined;

  const [isBlogActive, setIsBlogActive] = useState(isBlogType);
  // TODO: sync buttons group with query.type
  useEffect(() => {
    if (router.query.type === undefined) {
      setIsBlogActive(true);
    }
  }, [router.query]);

  const toggleMediaType = (isActive) => {
    setIsBlogActive(isActive);

    const type = isActive ? MEDIA_TYPES.blog : MEDIA_TYPES.press;

    router.push({
      pathname: router.pathname,
      query: { type },
    });
  };

  const isBlog = isBlogActive && type === MEDIA_TYPES.blog;
  const isPress = !isBlogActive && type === MEDIA_TYPES.press;

  if (!isMounted) return null;

  return (
    <Container className={styles.wrapper}>
      <header className={styles.blogHeader}>
        <Heading className={styles.title}>Media</Heading>
        <div className={styles.btnGroupWrapper}>
          <BlogButtonGroup
            onClick={toggleMediaType}
            defaultIsBlogActive={isBlogActive}
          />
        </div>
      </header>

      {isBlog && <BlogView posts={posts} count={count} pinned={pinned} />}

      {isPress && (
        <PressView posts={posts} count={count} pinned={pinned.items} />
      )}
    </Container>
  );
};

export const getServerSideProps = async (context) => {
  const { query } = context;

  const page = Number(query.page) || 1;
  const type = query.type ?? MEDIA_TYPES.blog;
  const limit =
    type === MEDIA_TYPES.blog ? DEFAULT_POSTS_LIMIT : DEFAULT_PRESS_LIMIT;

  const params = new URLSearchParams({
    type,
    limit,
    offset: (page - DEFAULT_PAGE) * limit,
  });

  const response = await Promise.all([
    fetch(`http://localhost:3000/api/posts/pinned?type=${type}`),
    fetch(`http://localhost:3000/api/posts?${params}`),
  ]);
  const [pinned, posts] = await Promise.all(response.map((res) => res.json()));

  return {
    props: {
      type,
      posts: posts.items,
      count: posts.count,
      pinned: {
        items: pinned.items,
      },
    },
  };
};

export default Media;
