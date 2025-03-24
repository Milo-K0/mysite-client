<template>
  <div class='empty-container'>
    <Icon class="icon" type="fileEmpty" />
    <p>{{ text }}</p>
  </div>
</template>

<script>
import Icon from '../Icon'
  export default {
    props: {
      text: {
        type: String,
        default: '无数据'
      }
    },
    components: {
      Icon
    }
  }
</script>

<style lang="less" scoped>
@import url(~@/styles/mixin.less);
@import url(~@/styles/var.less);
  .empty-container {
    .self-center();
    text-align: center;
    .icon {
      font-size: 48px;
    }
    color: @gray;
  }
</style>