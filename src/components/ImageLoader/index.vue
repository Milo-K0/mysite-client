<template>
  <div class='imageloader-container'>
    <img v-if="!allLoaded" class="placeholder" :src="placeholder" alt="">
    <img @load="loadImg" :style="{opacity: showImg,transition: `${duration}ms`}" :src="src">
  </div>
</template>

<script>
  export default {
    props: {
      placeholder: {
        type: String,
        require: true
      },
      src: {
        type: String,
        require: true
      },
      duration: {
        type: Number,
        default: 1000
      }
    },
    data() {
      return {
        isLoaded: false,
        allLoaded: false
      }
    },
    computed: {
      showImg() {
        return this.isLoaded ? 1 : 0;
      }
    },
    methods: {
      loadImg() {
        this.isLoaded = true;
        setTimeout(()=> {
          this.allLoaded = true;
          this.$emit('load');
        },this.duration);
      }
    }
  }
</script>

<style lang="less" scoped>
@import url(../../styles/mixin.less);
.imageloader-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    .self-full();
    object-fit: cover;
  }
  .placeholder {
    filter: blur(20px);
  }
}
</style>