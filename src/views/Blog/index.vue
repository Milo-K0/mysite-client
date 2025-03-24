<template>
  <div class='blog-container'>
    <Layout>
      <template #center>
        <BlogList ref="maincontainer" />
      </template>
      <template #right>
        <BlogCategory />
      </template>
    </Layout>
  </div>
</template>

<script>
import Layout from '../../components/Layout'
import BlogCategory from './components/BlogCategory.vue'
import BlogList from './components/BlogList.vue'
  export default {
    
    components: {
      Layout,
      BlogList,
      BlogCategory
    }
  }
</script>

<style lang="less" scoped>
.blog-container {
}
</style>