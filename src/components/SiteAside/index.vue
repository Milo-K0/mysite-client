<template>
  <div class='site-aside-container'>
    <Avatar :src="data?.avatar" />
    <h2>{{ data?.siteTitle }}</h2>
    <Menu />
    <Contact />
    <p class="footer">
      {{ data?.icp }}
    </p>
  </div>
</template>

<script>
import Avatar from '../Avatar'
import Menu from '../Menu'
import Contact from '../Contact'
import { mapState } from 'vuex'
  export default {
    components: {
      Avatar,
      Menu,
      Contact
    },
    computed: {
      ...mapState('setting',['data'])
    }
  }
</script>

<style lang="less" scoped>
@import '~@/styles/var.less';
.site-aside-container {
  box-sizing: border-box;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 25px;
  width: 210px;
  height: 100%;
  min-height: 660px;
  background-color: @dark;
  h2 {
    margin: 0;
    padding: 0;
    text-align: center;
    color: #fff;
    cursor: pointer;
  }
  .footer {
    position: absolute;
    color: darken(@gray,50%);
    font-size: 12px;
    bottom: 30px;
    cursor: pointer;
  }
}
.avatar-container {
  margin-bottom: 20px;
}
.contact-container {
  margin-top: 40px;
}
</style>