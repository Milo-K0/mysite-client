import Mock from 'mockjs'
import qs from 'querystring'
Mock.mock('/api/blogtype',{
  code: 0,
  msg: '',
  "data|10": [
    {
      'id|+1': 1,
      name: "分类@id",
      'articleCount|0-300': 0,
      order: 1
    }
  ]
});
Mock.mock(/^\/api\/blog(\?.+)?$/, "get",function(options){
  const query = qs.parse(options.url);
  return Mock.mock({
    code: 0,
    msg: '',
    data: {
      'total|2000-3000': 0,
      [`rows|${query.limit||10}`]: [
        {
          id: '@guid',
          title: '@ctitle(1,50)',
          description: '@cparagraph(1,10)',
          category: {
            "id|1-10": 0,
            name: '分类@id'
          },
          "scanNumber|0-3000": 0,
          "commentNumber|0-300":30,
          'thumb|1': ["@image(300x250,#color,#fff,@natural)",null],
          createDate: `@date('T')`
        }
      ]
    }
  });
});

Mock.mock(/^\/api\/blog\/[^/]+$/,'get',{
  code: 0,
  msg: '',
  data: {
    id: '@guid',
    title: '博客标题',
    category: {
      'id|1-10': 1,
      name: '分类@id'
    },
    'scanNumber|0-10000': 0, // 浏览次数
    'commentNumber|0-100': 0, // 评论数
    description: '@cparagraph(1,10)',
    createDate: "@Date('T')", // 时间戳，创建日期
    toc: [ // 博客章节目录
      {name: '章节1',ancthor: 'article-md-title-1'},
      {
        name: '章节2',
        ancthor: 'article-md-title-2',
        children: [
          {name: '章节2-1',ancthor: 'article-md-title-2-1'},
          {name: '章节2-2',ancthor: 'article-md-title-2-2'}
        ]
      },
      {name: '章节3',ancthor: 'article-md-title-3'}
    ],
    htmlContent: `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Markdown and Highlight.js CSS Only Test</title>
</head>

<body>
    <!-- 测试 Markdown 样式 -->
    <h1 id="article-md-title-1">章节1</h1>
    <h1 id="article-md-title-2">章节2</h1>
    <h2 id="article-md-title-2-1">章节2-1</h2>
    <p>这是一段普通的段落文本，用来测试 Markdown 的段落样式。</p>
    <ul>
        <li>无序列表项 1</li>
        <li>无序列表项 2</li>
    </ul>
    <ol>
        <li>有序列表项 1</li>
        <li>有序列表项 2</li>
    </ol>
    <h2 id="article-md-title-2-2">章节2-2</h2>
    <blockquote>
        这里是一段引用内容，用于测试引用样式。
    </blockquote>
    <hr>
    <h1 id="article-md-title-3">章节3</h1>
    <!-- 测试代码高亮，手动添加类名 -->
    <pre><code class="hljs javascript">
<span class="hljs-keyword">function</span> <span class="hljs-title function_">greet</span>(<span class="hljs-params">name</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-string"></span>;
}
<span class="hljs-keyword">let</span> message = <span class="hljs-title function_">greet</span>(<span class="hljs-string">'World'</span>);
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(message);
    </code></pre>
    <pre><code class="hljs python">
<span class="hljs-keyword">def</span> <span class="hljs-title function_">add_numbers</span>(<span class="hljs-params">a, b</span>):
    <span class="hljs-keyword">return</span> a + b

result = <span class="hljs-title function_">add_numbers</span>(<span class="hljs-number">3</span>, <span class="hljs-number">5</span>)
<span class="hljs-built_in">print</span>(result)
    </code></pre>
</body>

</html> 
    `, // 博客的html内容
    'thumb|1': [Mock.Random.image("200x100",'#000','#fff','Random Image'),null],
  }
});

Mock.mock('/api/comment','post', {
  code: 0,
  msg: '',
  data: {
    id: '@guid',
    nickname: '@cname',
    content: '@cparagraph(1,10)',
    createDate: Date.now(),
    'avatar|1': [
      'https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar6.jpg',
      'https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar4.jpg',
      'https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar8.jpg',
      'https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar2.jpg'
    ]
  }
});

Mock.mock(/^\/api\/comment\/?(\?.+)?$/,'get', function(options){
  const query = qs.parse(options.url);
  return Mock.mock({
    code: 0,
    msg: '',
    data: {
      'total': 52,
      [`rows|${query.limit||10}`]: [
        {
          id: '@guid',
          nickname: '@cname',
          content: '@cparagraph(1,10)',
          createDate: Date.now(),
          'avatar|1': [
            'https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar6.jpg',
            'https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar4.jpg',
            'https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar8.jpg',
            'https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar2.jpg'
          ]
        }
      ]
    }
  });
})