<template>
    <ul class="rightlist-container">
      <li v-for="(item,i) in list" :key="i">
        <span @click="handleClick(item)" :class="{active: item.isSelect}">{{ item.name }}</span>
        <span v-if="item.aside" @click="handleClick(item)" :class="{active: item.isSelect}" class="aside">{{ item.aside }}</span>
        <!-- 显示当前组件 -->
        <RightList :list="item.children" @select="handleClick"/>
      </li>
    </ul>
</template>

<script>
  export default {
    name: 'RightList',
    props: {
      list: {
        type: Array,
        default: () => ([])
      }
    },
    methods: {
      handleClick(item) {
        if(!item.isSelect) {
          this.$emit('select',item);
        }
      }
    }
  }
</script>

<style lang="less" scoped>
@import '~@/styles/var.less';
ul.rightlist-container {
  .rightlist-container {
    margin-left: 1em;
  }
  li {
    cursor: pointer;
    min-height: 40px;
    line-height: 40px;
    font-size: 14px;
    .active {
      color: @warn;
    }
    
  }
  .aside {
      color: @gray;
      margin-left: 1rem;
      font-size: 12px;
    }
}
</style>
