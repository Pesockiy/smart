import { postsMock, pressPostsMock } from '@/mock/blog';

export default async function getPostById(req, res) {
  const { id } = req.query;
  // FIXME: id issue; the same in PRESS and BLOG;
  const posts = postsMock.concat(pressPostsMock);
  const post = posts.find((p) => p.id === Number(id)) || null;

  res.status(200).json({ post });
}
