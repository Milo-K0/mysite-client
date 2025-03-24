<template>
  <div class='blog-detail-container' ref="mainContainer">
    <BlogMain :blog="blog" />
    <BlogComment v-if="!blogIsLoading" />
  </div>
</template>

<script>
import BlogMain from './BlogMain.vue';
import BlogComment from './BlogComment.vue';
  export default {
    components: {
      BlogMain,
      BlogComment
    },
    created() {
      this.$bus.$on('setMainScroll',this.handleSetMainScroll)
    },
    mounted() {
      this.$refs.mainContainer.addEventListener('scroll',this.handleScroll);
    },
    beforeDestroy() {
      this.$bus.$emit('mainScroll',undefined);
        this.$refs.mainContainer.removeEventListener('scroll',this.handleScroll);
        this.$bus.$off('setMainScroll',this.handleSetMainScroll);
    },
    props: {
      blog: {
        type: Object,
        default: () => ({})
      },
      blogIsLoading: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      handleScroll() {
        this.$bus.$emit('mainScroll',this.$refs.mainContainer);
      },
      handleSetMainScroll(scrollTop) {
        this.$refs.mainContainer.scrollTop = scrollTop;
      }
    }
  }
</script>

<style lang="less" scoped>
.blog-detail-container {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 20px;
  overflow-y: auto;
  box-sizing: border-box;
  scroll-behavior: smooth;
}
</style>