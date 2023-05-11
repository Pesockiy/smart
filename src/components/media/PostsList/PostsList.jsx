import PostItem from '../PostItem/PostItem';
import styles from './PostsList.module.sass';

const PostsList = ({ posts, isImgCover = true }) => {
  if (posts.length === 0) return <div>No Posts yet.</div>;

  return (
    <ul className={styles.list}>
      {posts.map((post, idx) => (
        <PostItem key={post.id} post={post} isImgCover={isImgCover} positionIdx={idx} />
      ))}
    </ul>
  );
};

export default PostsList;
