<template>
  <div class='carouselitem-container' ref="container" @mousemove="handleMousemove">
    <div class="carousel-img" ref="inner" :style="imagePosition" @mouseleave="handleMouseleave">
      <ImageLoader @load="this.showWords" :src="carousel.bigImg" :placeholder="carousel.midImg"/>
    </div>
    <div class="title" ref="title">{{ carousel.title }}</div>
    <div class="desc" ref="desc">{{ carousel.description }}</div>
  </div>
</template>

<script>
import ImageLoader from '../../components/ImageLoader'
  export default {
    props: ['carousel'],
    components: {
      ImageLoader
    },
    data() {
      return {
        titleWidth: 0,
        descWidth: 0,
        containerSize: null,
        innerSize: null,
        mouseX: 0,
        mouseY: 0
      }
    },
    mounted() {
      this.titleWidth = this.$refs.title.clientWidth;
      this.descWidth = this.$refs.desc.clientWidth;
      this.setSize();
      this.mouseX = this.center.x;
      this.mouseY = this.center.y;
      window.addEventListener('resize',this.setSize);
    },
    destroyed() {
      window.removeEventListener('resize',this.setSize);
    },
    computed: {
      imagePosition() {
        if(!this.innerSize || !this.containerSize) {
          return {};
        }
        const extraWidth = this.innerSize.width - this.containerSize.width; // 多出的宽度
        const extraHeight = this.innerSize.height - this.containerSize.height; // 多出的高度
        const left = -extraWidth / this.containerSize.width * this.mouseX;
        const top = -extraHeight / this.containerSize.height * this.mouseY;
        return {
          transform: `translate(${left}px,${top}px)`
        }
      },
      center() {
        return {
          x: this.containerSize.width / 2,
          y: this.containerSize.height / 2
        }
      }
    },
    methods: {
      showWords() {
        this.$refs.title.style.opacity = 1;
        this.$refs.title.style.width = 0;
        // 强制渲染
        this.$refs.title.clientWidth;
        this.$refs.title.style.transition = '1s';
        this.$refs.title.style.width = this.titleWidth + 'px';
        // 描述
        this.$refs.desc.style.opacity = 1;
        this.$refs.desc.style.width = 0;
        // 强制渲染
        this.$refs.desc.clientWidth;
        this.$refs.desc.style.transition = '2s 1s';
        this.$refs.desc.style.width = this.descWidth + 'px';
      },
      setSize() {
        this.containerSize = {
          height: this.$refs.container.clientHeight,
          width: this.$refs.container.clientWidth
        }
        this.innerSize = {
          height: this.$refs.inner.clientHeight,
          width: this.$refs.inner.clientWidth
        }
      },
      handleMousemove(e) {
        const rect = this.$refs.container.getBoundingClientRect();
        this.mouseX = e.clientX - rect.left;
        this.mouseY = e.clientY - rect.top;
      },
      handleMouseleave() {
        this.mouseX = this.center.x;
        this.mouseY = this.center.y;
      }
    }
  }
</script>

<style lang="less" scoped>
@import '~@/styles/var.less';
.carouselitem-container {
  position: absolute;
  color: #fff;
  background-color: @dark;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .carousel-img {
    position: absolute;
    width: 110%;
    height: 110%;
    transition: 0.2s;
  }
  .title,
  .desc {
    position: absolute;
    left: 30px;
    color: #fff;
    text-shadow: 1px 0 0 rgba(0,0,0,0.5),-1px 0 0 rgba(0,0,0,0.5),
    0 1px 0 rgba(0,0,0,0.5),0 -1px 0 rgba(0,0,0,0.5);
    white-space: nowrap;
    overflow: hidden;
    opacity: 0;
    cursor: default;
  }
  .title {
    top: calc(50% - 40px);
    font-size: 2rem;
  }
  .desc {
    top: calc(50% + 20px);
    font-size: 1.2rem;
    color: lighten(@gray,20%);
  }
}
</style>