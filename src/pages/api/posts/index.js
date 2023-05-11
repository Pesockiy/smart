import { postsMock, pressPostsMock } from '@/mock/blog';

export default async function getPosts(req, res) {
  const { limit = 6, offset = 0, type = 'blog' } = req.query;
  // NOTE: mediaType will be blog or press
  // NOTE: each post is set of title, description, image, id, createdAt, updatedAt;

  if (type === 'press') {
    res.status(200).json({
      items: getSubset({
        offset: Number(offset),
        limit: 15,
        data: pressPostsMock,
      }),
      count: pressPostsMock.length,
    });

    return;
  }

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
