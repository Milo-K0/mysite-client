<template>
  <div class='loading-container'>
    <img src="../../assets/loading.gif" alt="">
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="less" scoped>
.loading-container {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  img {
    height: 50px;
    width: 50px;
  }
}
</style>