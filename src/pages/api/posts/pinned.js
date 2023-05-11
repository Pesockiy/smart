import { pinnedBlogPostsMock, pinnedPressPostsMock } from '@/mock/blog';

export default async function getPinnedPosts(req, res) {
  const { type = 'blog' } = req.query;

  if (type === 'press') {
    res.status(200).json({ items: pinnedPressPostsMock });
    return;
  }

  res.status(200).json({ items: pinnedBlogPostsMock });
}
