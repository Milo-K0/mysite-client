import request from "./request";
/**
 * 获取单页数据
 * @param {Number} page 页码
 * @param {Number} limit 单页数据量
 * @param {Number} categoryid id
 * @returns 
 */
export async function getBlogs(page = 1,limit = 10,categoryid = -1) {
  let res =  await request.get('/api/blog', {
    params: {
      page,
      limit,
      categoryid
    }
  });
  return res.data.data
}

export async function getBlogTypes() {
  return (await request.get('/api/blogtype')).data.data;
}
/**
 * 获取单个博客数据
 * @param {Number} id 博客id
 * @returns 单个博客的数据
 */
export async function getBlog(id) {
  return (await request.get(`/api/blog/${id}`)).data.data;
}

/**
 * 发送评论
 * @param {Object} commitInfo 
 * @returns 
 */
export async function postCommit(commitInfo) {
  return (await (request.post('/api/comment',commitInfo))).data.data;
}

/**
 * 
 * @param {Number} blogId 
 * @param {Number} page 
 * @param {Number} limit 
 * @returns 
 */
export async function getCommits(blogId , page = 1 ,limit = 10) {
  return await (request.get('/api/comment', {
    params: {
      blogId,
      page,
      limit
    }
  }))
}