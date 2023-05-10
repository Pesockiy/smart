import { locationsMock } from '@/mock/locations';

export default async function getLocations(req, res) {
  res.status(200).json({ locations: locationsMock });
}
