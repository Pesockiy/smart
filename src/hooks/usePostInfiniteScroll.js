import { useEffect, useState } from 'react';

const usePostInfiniteScroll = ({ initial }) => {
  const [currentPosts, setCurrentPosts] = useState(() => [initial.post]);
  const [nextPostMap, setNextPostMap] = useState(new Map([[initial.post.id, initial.next]]));

  useEffect(() => {
    let isLoading = false;

    const handleScroll = async () => {
      if (isLoading) return;

      const { scrollHeight, scrollTop, clientHeight } = document.documentElement;

      const SCROLL_PERCENTAGE = 0.99;

      if (scrollTop + clientHeight >= scrollHeight * SCROLL_PERCENTAGE) {
        isLoading = true;

        const lastPostId = currentPosts[currentPosts.length - 1].id;
        const response = await fetch(`/api/posts/${lastPostId}?offset=1`);
        const { post } = await response.json();

        setCurrentPosts((prev) => prev.concat(post.current));
        setNextPostMap((prevNextPostMap) => {
          return new Map([...prevNextPostMap.entries(), [post.current.id, post.next]]);
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

export default usePostInfiniteScroll;
