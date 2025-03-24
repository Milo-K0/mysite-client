<template>
    <ul class='datalist-container'>
      <li v-for="item in list" :key="item.id">
        <Avatar
        :src="item.avatar"
        :size="44"
        />
        <div class="data">
          <div class="header">
            <div class="nicname">{{ item.nickname }}</div>
            <div class="time">{{ formatTime(+item.createDate) }}</div>
          </div>
          <div class="content">
            {{ item.content }}
          </div>
        </div>
      </li>
      
    </ul>
</template>

<script>
import Avatar from '../Avatar'
import { formatTime } from '@/utils';
  export default {
    components: {
      Avatar
    },
    props: {
      list: {
        type: Array,
        default: () => ([])
      }
    },
    methods: {
      formatTime
    }
  }
</script>

<style lang="less" scoped>
@import '~@/styles/var.less';
.datalist-container {
  margin-top: 45px;
  display: flex;
  flex-direction: column;
  li {
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-top: 15px;
    border-bottom: 1px solid @gray;
    .avatar-container {
      width: 50px;
    }
    .data {
      flex: 1;
      .header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .nicname {
          color: @success;
          font-weight: 550;
          font-size: 16px;
          margin-bottom: 15px;
        }
        .time {
          font-size: 12px;
          color: @gray;
        }
      }
      .content {
        color: @words;
      }
    }
  }
}
</style>