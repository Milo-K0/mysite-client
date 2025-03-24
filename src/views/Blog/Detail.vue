<template>
  <div class='detail-container'>
    <Layout>
      <template #center>
        <BlogDetail v-loading="isLoading" :blogIsLoading="isLoading" :blog="data" v-if="data" />
      </template>
      <template #right>
        <div class="right-container" v-loading="isLoading">
          <BlogTOC :toc="data.toc" />
        </div>
      </template>
    </Layout>
  </div>
</template>

<script>
import fetchData from '@/mixins/fetchData';
import { getBlog } from '@/api/blog';
import Layout from '@/components/Layout'
import BlogDetail from './components/BlogDetail.vue';
import BlogTOC from './components/BlogTOC.vue'
import { titleController } from '@/utils';
  export default {
    mixins: [fetchData({})],
    methods: {
      async fetchData() {
        let res = await getBlog(this.$route.params.id);
        if(!res) {
          this.$router.push('/404')
          return 
        }
        titleController.setRouteTitle(res.title);
        return res;
      }
    },
    components: {
      Layout,
      BlogDetail,
      BlogTOC,
    }
  }
</script>

<style lang="less" scoped>
.detail-container {
  width: 100%;
  height: 100%;
}
.right-container {
  height: 100%;
  width: 300px;
  position: relative;
}
</style>