<template>
    <i class="icon-container iconfont" :class="fontClass"></i>
</template>

<script>
  const classMap = {
    home: 'icon-home-filling',
    arrowDown: 'icon-arrow-down-bold',
    arrowUp: 'icon-arrow-up-bold',
    arrowLeft: 'icon-arrow-left-filling',
    arrowRight: 'icon-arrow-right-filling',
    love: 'icon-fabulous',
    user: 'icon-user-filling',
    smail: 'icon-smile',
    fileEmpty: 'icon-empty-file',
    qq: 'icon-11qq',
    weixin: 'icon-weixin-copy',
    email: 'icon-qunfengyouxiang',
    github: 'icon-github-fill',
    blog: 'icon-16',
    about: 'icon-guanyuwomen',
    project: 'icon-xiangmu',
    text: 'icon-icon-test',
    info: 'icon-info',
    error: 'icon-error',
    success: 'icon-success',
    warn: 'icon-warning',
    point: 'icon-dian'
  }
  export default {
    props: {
      type: {
        type: String,
        require: true
      }
    },
    computed: {
      fontClass() {
        return classMap[this.type];
      }
    }
  }
</script>

<style lang="less" scoped>
  @import url(//at.alicdn.com/t/c/font_4860195_q0f1g5he7q.css);
</style>