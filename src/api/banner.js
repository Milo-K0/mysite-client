import request from "./request";

export default async function getBanner() {
  const res = await request.get('/api/banner');
  return res.data.data;
}