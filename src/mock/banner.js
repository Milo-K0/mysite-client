import Mock from 'mockjs'

Mock.mock('/api/banner','get', {
  code: 0,
  msg: '',
  data: [
    {
      id: '1',
      midImg: 'https://milok.oss-cn-beijing.aliyuncs.com/mini-lakers.jpg',
      bigImg: 'https://milok.oss-cn-beijing.aliyuncs.com/lakers.jpg',
      title: 'NBA',
      description: '美国篮球联赛'
    },
    {
      id: '2',
      midImg: 'https://milok.oss-cn-beijing.aliyuncs.com/mini-james.jpg',
      bigImg: 'https://milok.oss-cn-beijing.aliyuncs.com/james.jpg',
      title: 'james',
      description: '勒布朗·詹姆斯'
    },
    {
      id: '3',
      midImg: 'https://milok.oss-cn-beijing.aliyuncs.com/mini-irving.jpg',
      bigImg: 'https://milok.oss-cn-beijing.aliyuncs.com/irving.jpg',
      title: 'irving',
      description: '凯里欧文'
    }
  ]
})