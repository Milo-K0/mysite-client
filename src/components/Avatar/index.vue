<template>
  <div class='avatar-container'>
    <img 
    class="avatar-img"
    :src="src"
    :style="{
      width: size + 'px',
      height: size + 'px'
    }"
    />
  </div>
</template>

<script>
  export default {
    props: {
      src: {
        type: String,
        require: true
      },
      size: {
        type: Number,
        default: 150
      },
    }
  }
</script>

<style lang="less" scoped>
  .avatar-img {
    border-radius: 50%;
    object-fit: cover;
  }
  
</style>