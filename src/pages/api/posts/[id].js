import { postsMock } from '@/mock/blog';

export default async function getPostById(req, res) {
  const { id } = req.query;

  const post = postsMock.find((p) => p.id === Number(id)) || null;

  res.status(200).json({ post });
}
