<template>
  <div class='home-container'  @wheel="handleWheel" v-loading="loading">
      <ul ref="container" class="carousel"  :style="{marginTop}" @transitionend="handleTransitionend">
        <li v-for="item in data" :key="item.id">
          <Carouselitem :carousel="item" />
        </li>
      </ul>
      <div @click="movePage(-1)" v-show="index >= 1"class="icon icon-up">
        <Icon type="arrowUp"/>
      </div>
      <div @click="movePage(1)" v-show="index < data.length - 1" class="icon icon-down">
        <Icon type="arrowDown"/>
      </div>
      <ul class="indicator">
        <li @click="changePage(i)" :class="{active: i === index}" v-for="(item,i) in data" :key="item.id"></li>
      </ul>
  </div>
</template>

<script>
import {getBanner} from '../../api/index'
import Carouselitem from './Carouselitem.vue';
import Icon from '../../components/Icon'
import { mapState } from 'vuex';
import loading from '@/directives/loading';
  export default {
      data() {
        return {
          index: 0, // 当前显示的是第几张轮播图
          containerHeight: 0, // 整个容器的高度
          switching: false, //是否正在翻页中
        }
      },
      created() {
        this.$store.dispatch('banner/fetchBanner')
      },
      methods: {
        movePage(i) {
          this.index += i;
          if(this.index < 0) {
            this.index = 0;
          }else if(this.index > this.data.length) {
            this.index = this.data.length;
          }
        },
        async fetchData() {
          return await getBanner();
        },
        changePage(i) {
          this.index = i;
        },
        handleWheel(e) {
          if(this.switching === true || e.deltaY < 5 && e.deltaY > -5) return;
          if(e.deltaY < -5 && this.index > 0) {
            this.switching = true;
            this.index--;
          }else if(e.deltaY > 5 && this.index < this.data.length - 1) {
            this.switching = true;
            this.index++;
          }
        },
        handleTransitionend() {
          this.switching = false;
        },
        handleResize() {
          this.containerHeight = this.$refs.container.clientHeight;
        }
      },
      computed: {
        marginTop() {
          return -this.index * this.containerHeight + 'px';
        },
        ...mapState('banner',['loading','data'])
      },
      mounted() {
        this.containerHeight = this.$refs.container.clientHeight;
        window.addEventListener('resize',this.handleResize);
      },
      destroyed() {
        window.removeEventListener('resize',this.handleResize);
      },
      components: {
        Carouselitem,
        Icon,
      }
  }
</script>

<style lang="less" scoped>
@import '~@/styles/mixin.less';
@import '~@/styles/var.less';
.home-container {
  position: relative;
  height: 100%;
  width: 100%;
  .carousel {
    position: absolute;
    width: 100%;
    height: 100%;
    transition: 500ms;
    li {
      width: 100%;
      height: 100%;
    }
  }
  .icon {
    position: absolute;
    left: 50%;
    color: @gray;
    cursor: pointer;
    z-index: 999;
    .icon-container {
      font-size: 30px;
    }
    @keyframes jump-up {
      0% {
        transform: translate(-50%,10px);
      }
      50% {
        transform: translate(-50%,-10px);
      }
      100% {
        transform: translate(-50%,10px);
      }
    }
    @keyframes jump-down {
      0% {
        transform: translate(-50%,-10px);
      }
      50% {
        transform: translate(-50%,10px);
      }
      100% {
        transform: translate(-50%,-10px);
      }
    }
  }
  .icon-up {
    top: 15px;
    animation: jump-up 2s infinite;
  }
  .icon-down {
    bottom: 15px;
    animation: jump-down 2s infinite;
  }
  .indicator {
    position: absolute;
    transform: translateY(-50%);
    color: @words;
    top: 50%;
    right: 25px;
    z-index: 999;
    li {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background-color: @words;
      cursor: pointer;
      margin-bottom: 10px;
      border: 1px solid #fff;
      box-sizing: border-box;
      &.active {
        background-color: #fff;
      }
    }
  }
}
</style>