<template>
  <div class='about-container' v-loading="loading || !srcLoaded">
    <iframe class="about-content" :src="src" frameborder="0" @load="srcLoaded = true">
      
    </iframe>
  </div>
</template>

<script>
import { mapState } from 'vuex';
  export default {
    components: {
    },
    data() {
      return {
        srcLoaded: false
      }
    },
    computed: {
      ...mapState('about',{
        src: 'data',
        loading: 'loading'
      })
    },
    created() {
      this.$store.dispatch('about/fetchAbout')
    }
  }
</script>

<style lang="less" scoped>
.about-container {
  height: 100%;
  width: 100%;
  position: relative;
  .about-content {
    width: 100%;
    height: 100%;
    display: block;
    box-sizing: border-box;
  }
}
</style>