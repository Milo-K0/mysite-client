<template>
  <div v-show="show" class='totop-container' @click="handleClick">
    Top
  </div>
</template>

<script>
  export default {
    data() {
      return {
        show: false
      }
    },
    created() {
      this.$bus.$on('mainScroll',this.handleScroll)
    },
    destroyed() {
      this.$bus.$off('mainScroll',this.handleScroll)
    },
    methods: {
      handleScroll(dom) {
        if(!dom) {
          this.show = false;
          return
        }
        this.show = dom.scrollTop >= 500
      },
      handleClick() {
        this.$bus.$emit('setMainScroll',0);
      }
    }
  }
</script>

<style lang="less" scoped>
@import '~@/styles/var.less';
.totop-container {
  position: fixed;
  z-index: 999;
  background-color: @primary;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  right: 50px;
  bottom: 50px;
  line-height: 50px;
  text-align: center;
  color: #fff;
  cursor: pointer;
}
</style>