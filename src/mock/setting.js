import Mock from "mockjs";

Mock.mock('/api/setting','get',{
  code: 0,
  msg: '',
  data: {
    avatar: 'https://ts1.tc.mm.bing.net/th/id/R-C.6ed64077b8b0f2f3a825286e38e2883a?rik=nTEIhX7ATOUsmQ&riu=http%3a%2f%2f5b0988e595225.cdn.sohucs.com%2fimages%2f20200318%2f27ee94c63139403a9d775a9b45c5694e.jpeg&ehk=9wVWLdbaeRgDU9OHgxCcpbMP9spCE9OXBSp3eyhpXrw%3d&risl=&pid=ImgRaw&r=0',
    siteTitle: 'DK\' Blog',
    github: 'https://github.com/Milo-K0',
    qq: '2963983871',
    qqQrCode: 'https://milok.oss-cn-beijing.aliyuncs.com/qqQrCode.png',
    weixin: '13403472278',
    weixinQrCode: 'https://milok.oss-cn-beijing.aliyuncs.com/weixinQrCode.png',
    mail: '2963983871@qq.com',
    icp: '小马的博客',
    githubName: 'Milo-K0',
    favicon: 'https://milok.oss-cn-beijing.aliyuncs.com/favicon.ico'
  }
})