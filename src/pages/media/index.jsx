import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Container from '@/common/Container/Container';
import Heading from '@/common/Heading/Heading';
import BlogButtonGroup from '@/components/ButtonGroup/ButtonGroup';
import PressView from '@/components/media/Press/Press';
import BlogView from '@/components/media/Blog/Blog';
import { useIsMounted } from '@/hooks';
import styles from './MediaPage.module.sass';
import Text from '@/common/Text/Text';
import ButtonGroup from '@/components/ButtonGroup/ButtonGroup';

const DEFAULT_POSTS_LIMIT = 6;
const DEFAULT_PRESS_LIMIT = 15;
const DEFAULT_PAGE = 1;

const options = [
  { label: 'Blog', value: 'blog' },
  { label: 'Press', value: 'press' },
];

const MEDIA_TYPES = options.reduce((prev, curr) => {
  prev[curr.value] = curr.value;
  return prev;
}, {});

export const Posts = {
  getById({ id, params }) {
    const searchParams = new URLSearchParams(params);
    return `http://localhost:3000/api/posts/${id}?${searchParams}`;
  },
  pinned(params) {
    const searchParams = new URLSearchParams(params);
    return fetch(`http://localhost:3000/api/posts/pinned?${searchParams}`);
  },
  get(params) {
    const searchParams = new URLSearchParams(params);
    return fetch(`http://localhost:3000/api/posts?${searchParams}`);
  },
};

const Media = ({ posts, count, pinned, type }) => {
  const router = useRouter();
  const isMounted = useIsMounted();

  const option = options.find((option) => option.value === router.query.type);
  const [activeOption, setActiveOption] = useState(option ?? options[0]);

  useEffect(() => {
    if (router.query.type === undefined) {
      setActiveOption(options[0]);
    }
  }, [router.query]);

  const toggleMediaType = (option) => {
    setActiveOption(option);

    const type = option.value === MEDIA_TYPES.blog ? MEDIA_TYPES.blog : MEDIA_TYPES.press;

    router.push({
      pathname: router.pathname,
      query: { type },
    });
  };

  const isBlogActive = activeOption.value === MEDIA_TYPES.blog && type === MEDIA_TYPES.blog;
  const isPressActive = activeOption.value === MEDIA_TYPES.press && type === MEDIA_TYPES.press;

  if (!isMounted) return null;

  return (
    <Container className={styles.wrapper}>
      <header className={styles.blogHeader}>
        <Heading className={styles.title}>
          <Text gradient>Media</Text>
        </Heading>

        <ButtonGroup
          wrapperClassName={styles.btnGroupWrapper}
          options={options}
          defaultOption={activeOption}
          onClick={toggleMediaType}
        />
      </header>

      {isBlogActive && <BlogView posts={posts} count={count} pinned={pinned} />}

      {isPressActive && <PressView posts={posts} count={count} pinned={pinned.items} />}
    </Container>
  );
};

export const getServerSideProps = async (context) => {
  const { query } = context;

  const page = Number(query.page) || 1;
  const type = query.type ?? MEDIA_TYPES.blog;
  const limit = type === MEDIA_TYPES.blog ? DEFAULT_POSTS_LIMIT : DEFAULT_PRESS_LIMIT;

  const response = await Promise.all([
    Posts.pinned({ type }),
    Posts.get({ type, limit, offset: (page - DEFAULT_PAGE) * limit }),
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
