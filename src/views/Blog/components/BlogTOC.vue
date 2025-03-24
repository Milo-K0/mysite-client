<template>
  <div class='blogtoc-container'>
    <h2>目录</h2>
      <RightList :list="tocWithSelect" @select="handleSelect"/>
  </div>
</template>

<script>
import RightList from './RightList.vue';
import { debounce } from '@/utils'
  export default {
    data() {
      return {
        activeAnchor: '',
      }
    },
    components: {
      RightList
    },
    props: {
      toc: {
        type: Array,
        default: () => ([])
      }
    },
    created() {
      this.setSelectDebounce = debounce(this.setSelect, 50);
      this.$bus.$on("mainScroll",this.setSelectDebounce);
      const hash = location.hash;
      location.hash = '';
      setTimeout(() => {
        location.hash = hash;
      },150)
    },
    destroyed() {
      this.$bus.$off('mainScroll',this.setSelectDebounce);
    },
    methods: {
      handleSelect(item) {
        console.log(item)
        location.hash = item.ancthor;
      },
      // 设置activeAnchor 为正确的值
      setSelect(scrollDom) {
        if(!scrollDom) return;
        const range = 200;
        for(const dom of this.doms) {
          // 看一下当前这个DOM元素是不是应该被选中
          if(!dom) {continue}
          // 得到元素离视口顶部的距离
          const top = dom.getBoundingClientRect().top
          if(top >= 0 && top <= range) {
            // 在规定的范围内
            this.activeAnchor = dom.id
            return;
          }else if(top > range) {
            // 在规定的范围下方
            return;
          }else {
            // 在规定的范围上方
            this.activeAnchor = dom.id;
          }
        }
      }
    },
    computed: {
      // 根据toc属性以及activeAnchor得到带有isSelect数组的toc数组
      tocWithSelect() {
        const getTOC = (toc = [])=> {
          return toc.map(t => ({
            ...t,
            isSelect: t.ancthor === this.activeAnchor,
            children: getTOC(t.children)
          }))

        }
        return getTOC(this.toc)
      },
      // 根据toc得到他们对应的 元素数组 
      doms() {
        const doms = [];

        const addToDoms = toc => {
          for(const t of toc) {
            doms.push(document.getElementById(t.ancthor));
            if(t.children && t.children.length) {
              addToDoms(t.children);
            }
          }
        };
        addToDoms(this.toc);
        return doms;
      }
    }
  }
</script>

<style lang="less" scoped>
.blogtoc-container {
  height: 100%;
  width: 300px;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  h2 {
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 1em;
    margin: 0;
  }
}
</style>