import request from "./request";

export default async function getProject() {
  return (await request.get('/api/project')).data.data;
}