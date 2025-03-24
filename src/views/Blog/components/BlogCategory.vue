<template>
  <div class='blogcategory-container' v-loading="isLoading">
    <h2>文章分类</h2>
    <RightList :list="list" @select="handleSelect"/>
  </div>
</template>

<script>
import RightList from './RightList.vue';
import fetchData from '@/mixins/fetchData';
import { getBlogTypes } from '@/api/blog';
  export default {
    mixins: [fetchData([])],
    components: {
      RightList
    },
    methods: {
      async fetchData() {
        return await getBlogTypes();
      },
      handleSelect(item) {
        let query = {
              page: 1,
              limit: this.limit
            }
        // 跳转到当前的分类id 当前的页容量 newPage的页码
        if(this.id === -1) {
          // 当前没有分类
          this.$router.push({
            name: 'Blog',
            query
          })
        }else {
          // 有分类
          this.$router.push({
            name: 'CategoryBlog',
            query,
            params: {
              categoryId: item.id
            }
          })
        }
      }
    },
    computed: {
      limit() {
        return this.$route.query.limit || 10;
      },
      categoryId() {
        return +this.$route.params.categoryId || -1;
      },
      list() {
        let totalArticalCount = this.data.reduce(
          (a,b) => (a + b.articleCount),0);
        const res = [{name:'全部',id:-1,articleCount: totalArticalCount},...this.data];
        return res.map((it) => ({
          ...it,
          isSelect: it.id === this.categoryId,
          aside: `${it.articleCount}篇`
        }));
      }
    }
  }
</script>

<style lang="less" scoped>
.blogcategory-container {
  height: 100%;
  width: 300px;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  h2 {
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 1em;
    margin: 0;
  }
}
</style>