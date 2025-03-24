<template>
  <div class='pager-container' v-if="allPage !== 0">
    <a v-show="current > 1" 
      :class= "{disabled: current === 1}"
      @click="pageChange(1)" >|&lt;&lt;</a>
    <a 
    :class="{disabled: current === 1}"
    @click="pageChange(current - 1)" >&lt;&lt;</a>
    <a v-for="(item,i) in numbers"
       :key="i"
       :class="{active: item === current}"
       @click="pageChange(item)">{{ item }}</a>
    <a 
    :class="{disabled: current === allPage}"
    @click="pageChange(current + 1)">&gt;&gt;</a>
    <a 
    v-show="current < allPage" 
    :class="{disabled: current === allPage}"
    @click="pageChange(allPage)">&gt;&gt;|</a>
  </div>
</template>

<script>

  export default {
    props: {
      current: {
        type: Number,
        default: 1
      },
      total: {
        type: Number,
        default: 0
      },
      limit: {
        type: Number,
        default: 10
      },
      visibleNumber: {
        type: Number,
        default: 10
      }
    },
    data() {
      return {
      }
    },
    computed: {
      allPage() {
        return Math.ceil(this.total / this.limit);
      },
      visibleMinNum() {
        let min = this.current - Math.floor(this.visibleNumber / 2);
        if(min < 1) {
          min = 1;
        }
        return min;
      },
      visibleMaxNum() {
        let max = this.visibleMinNum + this.visibleNumber - 1;
        if(max > this.allPage) {
          max = this.allPage;
        }
        return max;
      },
      numbers() {
        let nums = [];
        for(let i = this.visibleMinNum;i <= this.visibleMaxNum;i++) {
          nums.push(i);
        }
        return nums;
      }
    },
    methods: {
      pageChange(num) {
        if(num < 1) return;
        if(num > this.allPage) return;
        this.$emit('pageChange',num);
      }
    }
  }
</script>

<style lang="less" scoped>
@import url('~@/styles/var.less');
  .pager-container {
    display: flex;
    justify-content: center;
    margin: 20px 0;
    a {
      color: @primary;
      margin: 0 6px;
      &.disabled {
        color: @lightWords;
        cursor: not-allowed;
      }
      &.active {
        color: @dark;
        font-weight: 700;
        cursor: text;
      }
    }
  }
</style>