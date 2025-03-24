import request from "./request";

export async function getMessage(page=1,limit=10) {
  let res = await request.get('/api/message', {
    params: {
      page,
      limit
    },
  });
  return res.data.data;
}

export async function postMessage(msgInfo) {
  return (await request.post('/api/message',msgInfo)).data.data;
}