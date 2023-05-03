import Container from '@/common/Container/Container';

const Post = ({ post }) => {
  return (
    <Container>
      <h1>Title: {post.title}</h1>
      <p>Description: {post.description}</p>
      <p>Type: {post.type}</p>
    </Container>
  );
};

export const getServerSideProps = async (context) => {
  const response = await fetch(
    `http://localhost:3000/api/posts/${context.query.id}`
  );
  const result = await response.json();

  return {
    props: {
      post: result.post,
    },
  };
};

export default Post;
