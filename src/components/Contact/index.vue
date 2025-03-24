<template>
  <div class='contact-container'>
    <ul>
      <li>
      <a :href="data?.github" target="_blank"><Icon type="github" />{{ data?.githubName }}</a>
      </li>
      <li>
      <a :href='`mailto:${data?.mail}`' target="_blank"><Icon type="email" />{{ data?.mail }}</a>
      </li>
      <li>
      <a :href="`tencent://message/?Menu=yes&uin=${data?.qq}&Service=300&sigT=45a1e584793b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a595b1714f9d45`"><Icon type='qq' />{{ data?.qq }}</a>
      <div class="box">
        <img :src="data?.qqQrCode" alt="">
      </div>
      </li>
      <li>
      <a href=""><Icon type="weixin" />{{ data?.weixin }}</a>
      <div class="box">
        <img :src="data?.weixinQrCode" alt="">
      </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Icon from '../Icon'
import { mapState } from 'vuex';
  export default {
    data() {
      return {
        show: false
      }
    },
    components: {
      Icon
    },
    computed: {
      ...mapState('setting',['data'])
    }
  }
</script>

<style lang="less" scoped>
@import '~@/styles/var.less';
.contact-container {
  font-size: 12px;
  width: 100%;
  color: @gray;
  ul {
    margin: 0;
    padding: 0;
    li {
      height: 30px;
      line-height: 30px;
      padding: 0;
      list-style: none;
      margin: 12px 0;
      position: relative;
      &:hover {
        .box {
          transform: scaleY(1);
        }
      }
      a {
        display: flex;
        align-items: center;
        margin-left: 5px;
        cursor: pointer;
        .icon-container {
          font-size: 24px;
          margin-right: 5px;
          margin-left: 5px;
        }
      }
      .box {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 120px;
        height: 120px;
        background-color: #fff;
        position: absolute;
        top: -120px;
        left: 15px;
        border-radius: 10px;
        transform: scaleY(0);
        transform-origin: center bottom;
        transition: 0.3s;
        img {
          width: 80%;
          height: 80%;
        }
        &::after {
          position: absolute;
          content: '';
          width: 10px;
          height: 10px;
          background-color: #fff;
          bottom: -5px;
          transform: rotate(45deg);
        }
      }
    }
  }
}
</style>