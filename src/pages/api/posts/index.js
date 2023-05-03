import { postsMock } from '@/mock/blog';

export default async function getPosts(req, res) {
  const { limit = 6, offset = 0 } = req.query;
  // NOTE: each post is set of title, description, image, id, createdAt, updatedAt;
  const items = getSubset({
    limit: Number(limit),
    offset: Number(offset),
    data: postsMock,
  });

  res.status(200).json({ items, count: postsMock.length });
}

function getSubset({ data, offset, limit }) {
  const startIndex = offset;
  const endIndex = offset + limit;

  return data.slice(startIndex, endIndex);
}
