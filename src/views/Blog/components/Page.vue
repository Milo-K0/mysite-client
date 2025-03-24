<template>
  <div class='page-container'>
    <div class="img-container" v-if="item.thumb">
      <RouterLink :to="{
        name: 'BlogDetail',
        params: {id: item.id}
      }">
        <img v-lazy="item.thumb" :src="item.thumb" :alt="item.title" >
      </RouterLink>
    </div>
    <div class="text">
      <RouterLink :to="{
        name: 'BlogDetail',
        params: {id: item.id}
      }" class="title">
      {{ item.title }}
      </RouterLink>
      <div class="tags">
        <span class="date">日期: {{ formatDate(item.createDate) }}</span>
        <span class="look-counts">浏览: {{ item.scanNumber }}</span>
        <span class="comment">评论: {{ item.commentNumber }}</span>
        <span class="category">
          <RouterLink :to="{
            name: 'CategoryBlog',
            params: {
              categoryId: item.category.id
            }
          }">
            分类: {{ item.category.id }}
          </RouterLink>
        </span>
      </div>
        <div class="desc">{{ item.description }}</div>
    </div>
  </div>
</template>

<script>
import { formatDate } from '@/utils'
import { RouterLink } from 'vue-router';
  export default {
    props: {
      item: {
        type: Object,
        default: () => ({})
      }
    },
    methods: {
       formatDate
    }
  }
</script>

<style lang="less" scoped>
@import '~@/styles/var.less';
.page-container {
  cursor: pointer;
  margin: 25px;
  padding-bottom: 15px;
  display: flex;
  flex-direction:row;
  border-bottom: 1px solid @gray;
  .img-container {
    
    width: 200px;
    height: 150px;
    border-radius: 5px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      float: left;
    }
  }
  .text {
    margin-left: 10px;
    flex: 1;
    .title {
      font-size: 24px;
      margin: 0;
      padding: 0;
    }
    .tags {
      margin-top: 3px;
      font-size: 12px;
      color: @gray;
      .date {
        margin: 0;
      }
      span {
        margin-left: 10px;
      }
    }
    .desc {
      margin-top: 18px;
      font-size: 14px;
    }
  }
}
</style>