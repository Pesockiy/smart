import { postsMock, pressPostsMock } from '@/mock/blog';
import { postMock } from '@/mock/blog/post';

export default async function getPostById(req, res) {
  const { id, offset } = req.query;
  // FIXME: id issue; the same in PRESS and BLOG;
  const posts = postsMock.concat(pressPostsMock);
  const items = posts.map((item) => ({
    ...postMock,
    ...item,
  }));
  const postIdx = items.findIndex((p) => p.id === Number(id));

  if (Number(offset)) {
    const post = items[postIdx + 1] || null;
    const next = items[postIdx + 2] || null;

    res.status(200).json({ post: { next, current: post } });
  }

  res
    .status(200)
    .json({ post: items[postIdx] ?? null, next: items[postIdx + 1] ?? null });
}
