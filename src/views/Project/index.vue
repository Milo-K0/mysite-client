<template>
  <div class='project-container' ref="container">
    <div v-for="item in data" :key="item.id" :target="item.url?'_blank':'_self'" class="project-item">
      <a :href="item.url? item.url:`javascript:alert('该项目无法通过外网访问')`"  v-loading="loading">
        <img  v-lazy="item.thumb" class="thumb">
      </a>
      <div class="info">
        <h2>
          <a :href="item.url? item.url:`javascript:alert('该项目无法通过外网访问')`"  v-loading="loading">{{ item.name }}</a>
        </h2>
        <a :href="item.github" v-if="item.github" target="_blank" class="github">github</a>
        <p>
          {{ item.description }}
        </p>
      </div>
    </div>
    <Empty v-if="data.length === 0 && !loading" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Empty from '@/components/Empty'
import loading from '@/directives/loading';
  export default {
    components: {
      Empty
    },
    created() {
      this.$store.dispatch('project/fetchProject')
      this.$bus.$on('setMainScroll',this.handleSetMainScroll)
    },
    mounted() {
      this.$refs.container.addEventListener('scroll',this.handleScroll);
    },
    beforeDestroy() {
      this.$bus.$emit('mainScroll',undefined);
      this.$bus.$off('setMainScroll',this.handleSetMainScroll)
      this.$bus.$off('mainScroll',this.$refs.container);
      this.$refs.container.removeEventListener('scroll',this.handleScroll);
    },
    computed: {
      ...mapState('project',['loading','data'])
    },
    methods: {
      handleScroll() {
        this.$bus.$emit('mainScroll',this.$refs.container);
      },
      handleSetMainScroll(scrollTop) {
        this.$refs.container.scrollTop = scrollTop;
      }
    }
  }
</script>

<style lang="less" scoped>
@import '~@/styles/var.less';
.project-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  scroll-behavior: smooth;
  .project-item {
    display: flex;
    flex-direction: row;
    height: 200px;
    width: 90%;
    padding: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
    border-radius: 5px;
    &:hover {
      box-shadow: -1px 1px 5px #000;
      transform: scale(1.01) translate(3px,-3px);
      color: inherit;
    }
    .thumb {
      width: 250px;
      min-height: 150px;
      flex: 0 0 auto;
      object-fit: cover;
      border-radius: 5px;
      margin-right: 15px;
    }
    .info {
      line-height: 1.7;
      flex: 1 1 auto;
      h2 {
        margin: 0;
      }
      .github {
        font-size: 14px;
        color: @primary;

      }
    }
  }
}
</style>