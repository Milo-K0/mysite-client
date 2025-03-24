<template>
  <div class='blogmain-container'>
    <h1>{{ blog.title }}</h1>
    <div class="aside">
      <span class="first">日期: {{ formatDate(blog.createDate) }}</span>
      <span>浏览: {{ blog.scanNumber }}</span>
      <a href="#data-form-container">评论: {{ blog.commentNumber }}</a>
      <template v-if="blog.category?.id">
        <RouterLink :to="{
        name: 'CategoryBlog',
        query: {
          page: 1,
          limit: 10
        },
        params: {
          categoryId: blog.category.id
        }
      }">分类: {{ blog.category?.name }}</RouterLink>
      </template>
    </div>
    <div v-html="blog.htmlContent" class="markdown-body"></div>
    
  </div>
</template>

<script>
import { formatDate } from '@/utils';
import "@/styles/markdown.css";
import 'highlight.js/styles/github.css';
import BlogComment from './BlogComment.vue';

  export default {
    props: {
      blog: {
        type: Object,
        default: () => ({})
      }
    },
    methods: {
      formatDate
    },
    components: {
      BlogComment
    }
  }
</script>

<style lang="less" scoped>
@import '~@/styles/var.less';
.blogmain-container {
  position: relative;
  box-sizing: border-box;
  .aside {
    margin-top: 20px;
    font-size: 12px;
    color: @gray;
    .first {
      margin-left: 0;
    }
    span,a {
      margin-left: 15px;
    }
  }
  .markdown-body {
    margin-top: 1rem;
  }
}
</style>