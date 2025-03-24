<template>
  <div class='app'>
    <Layout>
      <template #left>
          <SiteAside />
      </template>
      <template #center>
        <RouterView />
      </template>
    </Layout>
    <ToTop />
  </div>
</template>

<script>
import SiteAside from '@/components/SiteAside'
import Layout from './components/Layout';
import ToTop from '@/components/ToTop';
  export default {
    data() {
      return {
      }
    },
    components: {
      Layout,
      ToTop,
      SiteAside
    },
    methods: {
      
    }
    
  }
</script>

<style lang="less" scoped>
@import '~@/styles/var.less';
.app {
  position: fixed;
  width: 100%;
  height: 100%;
  .layout-container {
    
  }
}
</style>