<template>
  <div class='layout-container'>
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
  export default {
   
  }
</script>

<style lang="less" scoped>
.layout-container {
  margin: 0;
  padding: 0;
  display: flex;
  height: 100vh;
  .left {
    height: 100%;
  }
  .center {
    flex: 1;
    height: 100%;
  }
  .right {
    height: 100%;
  }
}
</style>