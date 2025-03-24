<template>
  <div class='menu-container'>
    <ul>
      <li 
      v-for="(item,i) in info"
      
      :key="i"
      >
        <RouterLink :to="{name: item.name}" :exact="item.exact">
          <Icon :type="item.iconType" />
          {{ item.content }}
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<script>
import Icon from '../Icon'
  export default {
    components: {
      Icon
    },
    data() {
      return {
        info: [{
              content: '首页',
              iconType: 'home',
              name:'Home',
              exact: true
            },
            {
              content: '文章',
              iconType: 'blog',
              name:'Blog',
              exact: false
            },
            {
              content: '关于我',
              iconType: 'about',
              name:'About',
              exact: true
            },
            {
              content: '项目&效果',
              iconType: 'project',
              name:'Project',
              exact: true
            },
            {
              content: '留言板',
              iconType: 'text',
              name:'Text',
              exact: true
            }],
      }
    },
    computed: {
      isActive() {
        const location = window.location.pathname;
        return location;
      }
    },
    methods: {
    }
  }
</script>

<style lang="less" scoped>
@import '~@/styles/var.less';
  .menu-container {
    width: 100%;
    ul {
      li {
        margin: 12px 0;
        display: flex;
        justify-content: center;
        height: 30px;
        font-size: 12px;
        color: @gray;
        line-height: 30px;
        a {
          display: flex;
          align-items: center;
          width: 100%;
          padding-left: 43px;
          &.router-link-active {
            background: darken(@words,3%);
            color: #fff;
          }
          .icon-container {
            margin-right: 5px;
            font-size: 20px;
          }
          &:hover {
            color: #fff;
          }
        }
      }
    }
  }
</style>