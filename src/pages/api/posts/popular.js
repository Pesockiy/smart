import { popularPostsMock, postsMock } from '@/mock/blog';

export default async function getPopularPosts(req, res) {
  // NOTE: in case it is popular, we need to calculate it somehow;

  res.status(200).json({ items: popularPostsMock });
}
