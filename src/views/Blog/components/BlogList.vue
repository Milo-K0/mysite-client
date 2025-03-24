<template>
  <div class='bloglist-container' ref="container" v-loading="isLoading">
    <ul>
      <li v-for="item in data.rows" :key="item.id">
        <Page :item="item"/>
      </li>
    </ul>
    <Pager :current="+routeInfo.page" :total="data.total" :limit="+routeInfo.limit" :visibleNumber="10" @pageChange="handlePageChange"/>
    <Empty v-if="data.rows.length === 0 && !isLoading" />
  </div>
</template>

<script>
import Page from './Page.vue';
import fetchData from '@/mixins/fetchData';
import { getBlogs } from '@/api/blog';
import Pager from '../../../components/Pager'
import Empty from '@/components/Empty'
  export default {
    data() {
      return {

      }
    },
    computed: {
      // 获取路由信息
      routeInfo() {
        const categoryId = this.$route.params.categoryId || -1;
        const page = this.$route.query.page || 1;
        const limit = this.$route.query.limit || 10;
        return {
          categoryId,
          page,
          limit
        }
      }
    },
    mixins: [fetchData({total: 0,rows: []})],
    mounted() {
        this.$bus.$on('setMainScroll',this.handleSetMainScroll);
        this.$refs.container.addEventListener('scroll',this.handleScroll);
      },
    methods: {
      async fetchData() {
      let res =  await getBlogs(this.routeInfo.page,this.routeInfo.limit,this.routeInfo.categoryId);
        return res;
      },
      handleSetMainScroll(scrollTop) {
        this.$refs.container.scrollTop = scrollTop;
      },
      handleScroll() {
        this.$bus.$emit('mainScroll',this.$refs.container);
      },
      handlePageChange(newPage) {
        let query = {
              page: newPage,
              limit: this.routeInfo.limit
            }
        // 跳转到当前的分类id 当前的页容量 newPage的页码
        if(this.routeInfo.categoryId === -1) {
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
              categoryId: this.routeInfo.categoryId
            }
          })
        }
      }
    },
    beforeDestroy() {
      this.$bus.$emit('mainScroll',undefined);
      this.$refs.container.removeEventListener('scroll',this.handleScroll);
      this.$bus.$off('setMainScroll',this.handleSetMainScroll);
    },
    watch: {
      $route: {
        async handler() {
          this.isLoading = true;
          // 滚动高度为0
          this.$refs.container.scrollTop = 0;
          this.data = await this.fetchData();
          this.isLoading = false;
        },
        deep: false,
        immediate: false
      }
    },
    components: {
      Page,
      Pager,
      Empty
    }
  }
</script>

<style lang="less" scoped>
.bloglist-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  scroll-behavior: smooth;
}
</style>